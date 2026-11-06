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
            "titre": "Un titre percutant",
            "breve": "Le texte de la brève...",
            "chiffres_cles": ["11,3%", "492,8 M€", "9,2%"]
        }
        
        Règles :
        1. Le champ "chiffres_cles" doit être un tableau (array) contenant TOUS les nombres, pourcentages et montants en euros cités dans ta brève.
        2. N'invente aucun chiffre. Si tu ne trouves pas de chiffres, renvoie un tableau vide [].
        
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

            const texteVerifNettoye = nettoyerChiffre(pdf.texteVerification);
            let status = 'OK';
            let erreurLog = null;
            const chiffresIntrouvables = [];

            for (const chiffre of json.chiffres_cles || []) {
                const chiffreNettoye = nettoyerChiffre(chiffre);
                const trouve = texteVerifNettoye.includes(chiffreNettoye) || 
                               pdf.texteVerification.includes(chiffre);
                
                if (!trouve) {
                    chiffresIntrouvables.push(chiffre);
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