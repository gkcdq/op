import { extraireTextePdf } from "./pdfToText";  // Adapte le chemin selon ton dossier

async function test() {
    // Prends une URL de ton curl précédent (ENGIE)
    const url = "https://fr.ftp.opendatasoft.com/datadila/INFOFI/ECO/2026/11/FCECO083676_20261105.pdf";

    console.log("⏳ Téléchargement et extraction en cours...");
    const resultat = await extraireTextePdf(url);

    console.log("✅ Résultat :");
    console.log("- Lisible :", resultat.lisible);
    console.log("- Tronqué :", resultat.tronque);
    console.log("- Pages totales :", resultat.pagesTotal);
    console.log("- Pages retenues :", resultat.pagesRetenues);
    
    if (resultat.erreur) {
        console.log("- ❌ Erreur :", resultat.erreur);
    } else {
        console.log("\n--- EXTRAIT DU TEXTE (LLM) ---");
        console.log(resultat.texte);
        
        console.log("--- EXTRAIT DU TEXTE (VÉRIFICATION) ---");
        console.log(resultat.texteVerification);
    }
}

test();