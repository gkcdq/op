import { extraireTextePdf } from "../../script/datagouv/pdfToText"; 
import { Mistral } from "@mistralai/mistralai";
import 'dotenv/config';
import { PublicationNotee } from "../../script/datagouv/pertinence";
import { PrismaService } from "../../../prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

function nettoyerChiffre(texte: string): string {
    return texte
        .replace(/\s/g, '') 
        .replace(/€|EUR|euros?/gi, '')
        .replace(/\./g, ',') 
        .toLowerCase();
}

@Injectable()
export class BriefService
{
    private readonly logger = new Logger(BriefService.name);
    
    constructor(private readonly prisma: PrismaService) {}

    async genererBrief(pub: PublicationNotee)
    {
        const url = pub.url;
        if (!url) return null;

        this.logger.log(`Vérification de l'existence de la brève pour ${pub.societe}...`);
        const brèveExistante = await this.prisma.llmVerification.findUnique({
            where: {
                cle_unique: {
                    isin: pub.id, 
                    publishedAt: pub.date,
                    documentUrl: url,
                    model: "ministral-8b-latest"
                }
            }
        });

        if (brèveExistante)
        {
            this.logger.log(`Brève déjà existante en base pour ${pub.societe}. Processus ignoré.`);
            return brèveExistante; 
        }

        this.logger.log(`Extraction du PDF pour ${pub.societe}...`);
        const pdf = await extraireTextePdf(url);
        
        if (!pdf.lisible) {
            this.logger.warn(`PDF illisible pour ${pub.id} : ${pdf.erreur}`);
            return;
        }

        this.logger.log(`Appel du LLM Mistral pour ${pub.societe}...`);
        
        const prompt = `Tu es un journaliste financier. À partir du texte ci-dessous, rédige une brève de 100 à 150 mots en français.

        Attention, tu dois impérativement respecter ce format JSON, sans rien ajouter d'autre :
        {
            "societe": "${pub.societe || 'Inconnue'}",
            "titre": "Un titre percutant",
            "breve": "Le texte de la brève...",
            "chiffres_cles": [
                { "label": "Chiffre d'affaires", "valeur": "492,8 M€" },
                { "label": "Croissance", "valeur": "+11,3%" }
            ]
        }
        
        Règles STRICTES :
        1. Le champ "chiffres_cles" doit être un tableau d'objets.
        2. Pour le champ "valeur", tu dois COPIER-COLLER le chiffre EXACTEMENT tel qu'il apparaît dans le texte source (avec la même devise, les mêmes virgules, les mêmes espaces). Ne reformate pas le chiffre.
        3. Le champ "label" doit être une description courte et claire (ex: "Chiffre d'affaires", "Marge", "Dette nette").
        4. N'invente aucun chiffre. Si tu ne trouves pas de chiffres, renvoie un tableau vide [].
        
        Texte source :
        ${pdf.texte}`;

        try {
            const chatResponse = await mistral.chat.complete({
                model: "ministral-8b-latest",
                messages: [{ role: "user", content: prompt }],
                responseFormat: { type: "json_object" },
            });

            const content = chatResponse.choices[0].message.content;
            const json = typeof content === 'string' ? JSON.parse(content) : content;

            if (!json.societe) {
                json.societe = pub.societe;
            }

            const texteVerifNettoye = nettoyerChiffre(pdf.texteVerification);
            let status = 'OK';
            let erreurLog = null;
            const chiffresIntrouvables = [];

            // ✅ BOUCLE CORRIGÉE
            for (const item of json.chiffres_cles || [])
            {
                const chiffre = item.valeur; // On extrait la valeur (ex: "492,8 M€")
                const chiffreNettoye = nettoyerChiffre(chiffre);
                const trouve = texteVerifNettoye.includes(chiffreNettoye) || 
                               pdf.texteVerification.includes(chiffre);
                
                if (!trouve) {
                    chiffresIntrouvables.push(`${item.label} (${chiffre})`);
                }
            }

            if (chiffresIntrouvables.length > 0) {
                status = 'PARTIEL';
                erreurLog = `Chiffres non trouvés : ${chiffresIntrouvables.join(', ')}`;
                this.logger.warn(erreurLog);
            }

            await this.prisma.llmVerification.upsert({
                where: {
                    cle_unique: {
                        isin: pub.id, 
                        publishedAt: pub.date,
                        documentUrl: url,
                        model: "ministral-8b-latest"
                    }
                },
                update: {
                    status: status,
                    briefJson: json,
                    error: erreurLog,
                    generatedAt: new Date()
                },
                create: {
                    isin: pub.id, 
                    publishedAt: pub.date,
                    documentUrl: url,
                    model: "ministral-8b-latest",
                    status: status,
                    briefJson: json,
                    error: erreurLog
                }
            });

            this.logger.log(`✅ Brève sauvegardée pour ${pub.societe} (Statut: ${status})`);
            return json;

        }
        catch (error)
        {
            this.logger.error("Erreur lors de l'appel à Mistral", error);
        }
    }
}