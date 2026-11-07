# Bergdot - Veille Financière & IA

**🔗 Liens du projet :**
- **URL de l'application déployée :** [https://ton-domaine.trycloudflare.com](https://ton-domaine.trycloudflare.co) *(à remplacer par ton lien Cloudflare)*
- **Lien du repo GitHub :** [https://github.com/ton-pseudo/bergdot](https://github.com/ton-pseudo/bergdot) *(à remplacer par ton lien)*

---

## Objectif du projet
Construire une petite web application qui récupère les publications réglementées des sociétés cotées (via l'API open data InfoFinancière de l'AMF) et en tire des brèves d'actualité fiables.

---

## Fonctionnalités attendues
- Récupérer les publications d'une période récente (quelques jours suffisent) depuis la source open data InfoFinancière.
- Les stocker et les afficher dans une liste filtrable par société, type d'information et date.
- Sélectionner automatiquement les publications qui méritent un article, et expliquer le critère.
- Pour 3 à 5 publications retenues, générer avec un LLM une brève de 100 à 150 mots : titre, faits clés, chiffres, lien vers le document source.
- Vérifier que les chiffres de la brève figurent bien dans le document source, et signaler les cas où ce n'est pas vérifiable.

---

## Choix techniques

### Backend : NestJS + Prisma + PostgreSQL
- **NestJS** : Framework robuste, modulaire et idéal pour gérer des tâches asynchrones (cron, ingestion).
- **Prisma** : ORM très typé, parfait pour manipuler les données avec TypeScript et éviter les erreurs SQL.
- **PostgreSQL** : Base de données relationnelle, idéale pour stocker les publications et les résultats de l'IA avec des contraintes d'unicité (pour éviter de payer deux fois le même PDF).
- **Supabase** : Utilisé comme hébergeur de base de données (tier gratuit).
- **Planification** : Utilisation de `@nestjs/schedule` pour lancer l'ingestion et le rafraîchissement du cache toutes les 30 minutes (et au démarrage).

### Extraction PDF : `pdftotext` (Poppler)
- **Pourquoi ?** C'est l'outil en ligne de commande le plus rapide et le plus fiable pour extraire du texte à partir de PDF (sans dépendre d'une API externe payante).
- **Sécurité** : Le téléchargement est restreint au domaine officiel `fr.ftp.opendatasoft.com`, limité à 10 Mo, avec un timeout de 20 secondes.

### Intelligence Artificielle : Mistral (SDK Node)
- **Modèle** : `ministral-8b-latest` (suffisant, très rapide et inclus dans le plan gratuit).
- **Format** : Utilisation du `responseFormat: { type: "json_object" }` pour garantir une sortie structurée.

### Frontend : React (Vite) + Axios + Framer Motion
- **React 18** avec Vite pour la rapidité de développement.
- **Axios** pour les appels API.
- **Framer Motion** pour les animations fluides (apparition en cascade des cartes, transitions de vues).
- **CSS pur** (sans framework) pour un contrôle total sur le design "Terminal" (couleurs, polices IBM Plex Mono, effets de bordure).
- **Design** : Interface inspirée des terminaux Bloomberg, avec un écran d'accueil, une banderole de données défilante, une grille de cartes et une vue détaillée par entreprise.
- **UX** : Skeleton Loader (effet de chargement), barre de recherche temps réel, et tableau structuré pour les données financières.
- **Logos** : Intégration des logos d'entreprises via le CDN de **Logo.dev** (recherche par nom nettoyé, avec fallback sur les initiales).

---

## Déploiement 
- **Local** : Déploiement sur serveur local.
- **Cloudflare** : Déploiement gratuit (hors prix du domaine) via les tunnels Cloudflare.

---

## Compréhension de la structure des données
L'API InfoFinancière renvoie un flux JSON brut. Plusieurs requêtes `curl` ont été effectuées pour comprendre la structure des données, avec comme lien commun :
`https://www.info-financiere.gouv.fr/api/explore/v2.0/commun/datasets`

- **Gestion des dates** : L'API renvoie parfois des dates d'erreur (ex: `8000-01-01`). Une fonction `toValidDate()` a été implémentée pour écarter ces dates fantômes.
- **Champs utiles** : Seuls `issuer` (société), `title` (titre), `subtype` (type d'info), `url` (PDF) et `cac40` (booléen) ont été conservés pour l'analyse (dans `pertinence.ts`).
- **Nettoyage** : Les champs textuels sont nettoyés (trim, suppression des espaces multiples, etc.).

---

## Critère de sélection des publications
Toutes les publications ne méritent pas un article (ex: "Mise à disposition de prospectus"). Un système de points a été mis en place dans `pertinence.ts` :

**Points par type de document :**
- Offre publique d'acquisition : 100 pts
- Information financière trimestrielle : 70 pts
- Rapports semestriels : 60 pts
- Franchissement de seuil : 45 pts
- Informations privilégiées : 40 pts
- Type par défaut : 10 pts

**Bonus par mots-clés dans le titre :**
- "Résultats", "chiffre d'affaires" : +20 pts
- "Acquisition", "fusion", "offre" : +25 pts
- "Dividende" : +15 pts
- "Objectifs", "guidance" : +15 pts
- Malus : "Mise à disposition" : -30 pts

**Autres bonus :**
- **Bonus montant** : Si un montant (ex: "M€", "%") est détecté dans le titre : +10 pts
- **Bonus CAC 40** : +15 pts

**Filtres et Tri :**
- **Filtre d'exclusion** : Les déclarations de rachat d'actions et les documents sans URL sont exclus.
- **Tri final** : Par points (décroissant), puis par langue (français d'abord), puis par date (plus récent d'abord). Un seul article par société est conservé.

---

## Contrôle de l'exactitude des chiffres
Pour éviter les hallucinations du LLM, une approche de **vérification par normalisation** a été implémentée :

1. **Extraction du PDF** : Le texte est extrait et nettoyé. Une version `texteVerification` est spécialement préparée pour coller les nombres (ex: `492,8 M€` devient `492,8`).
2. **Normalisation du LLM** : Les chiffres renvoyés par le LLM sont nettoyés (suppression des espaces, des devises `€`/`EUR`, uniformisation des virgules/points).
3. **Vérification** : On cherche si le chiffre normalisé du LLM est présent dans le texte normalisé du PDF.
   - Si **tous** les chiffres sont trouvés : statut `OK`.
   - Si **un ou plusieurs** chiffres sont introuvables : statut `PARTIEL`, avec le détail des chiffres manquants dans le champ `error`.

**Pourquoi cette approche ?**
Elle est simple, rapide, et permet de détecter les vraies hallucinations. Elle ne vérifie pas le contexte sémantique (ce qui nécessiterait un second LLM), mais elle garantit que le LLM n'a pas inventé de chiffres. *(Une potentielle piste d'amélioration est le rajout d'un deuxième agent de vérification de contexte).*

---

## 3 prompts clés et une erreur de l'IA

### 1. Prompt de contexte
> "Tu es un journaliste financier. À partir du texte ci-dessous, rédige une brève de 100 à 150 mots en français."

### 2. Prompt de consigne (Formatage strict et structuré)
> Attention, tu dois impérativement respecter ce format JSON, sans rien ajouter d'autre :
> ```json
> {
>     "societe": "Nom",
>     "titre": "Un titre percutant",
>     "breve": "Le texte de la brève...",
>     "chiffres_cles": [
>         { "label": "Chiffre d'affaires", "valeur": "492,8 M€" },
>         { "label": "Croissance", "valeur": "+11,3%" }
>     ]
> }
> ```
> Règles STRICTES :
> 1. Le champ "chiffres_cles" doit être un tableau d'objets avec un "label" (ex: "Marge") et une "valeur".
> 2. Pour le champ "valeur", tu dois COPIER-COLLER le chiffre EXACTEMENT tel qu'il apparaît dans le texte source. Ne reformate pas le chiffre.
> 3. N'invente aucun chiffre. Si tu ne trouves pas de chiffres, renvoie un tableau vide [].

### 3. Prompt de contexte applicatif
> "Texte source : ${pdf.texte}"

### Erreur de l'IA détectée
Lors des tests, le LLM a généré une brève pour **ENGIE** en utilisant des chiffres (`11,3%`, `492,8 M€`, `9,2%`) qui n'apparaissaient pas dans le communiqué d'ENGIE (le LLM a mélangé avec les données d'un autre communiqué ou d'une autre page du PDF). **Grâce aux fonctions de vérification, ces chiffres ont été immédiatement identifiés comme introuvables**, et la brève a été marquée `PARTIEL` avec un message d'erreur explicite.

---

## Optimisation des coûts et gestion des tokens (IA)

L'utilisation d'un LLM (Mistral) représente un coût par token. Pour rendre l'application viable en production, plusieurs stratégies d'optimisation ont été mises en place :

### 1. Filtrage strict en amont (Éviter les appels inutiles)
Plutôt que d'envoyer tous les PDFs au LLM, un algorithme de scoring (dans `pertinence.ts`) sélectionne uniquement les **5 publications les plus pertinentes** sur une période de 3 jours. Sur les 392 publications récupérées, seules 5 sont analysées, réduisant drastiquement le volume de tokens consommés.

### 2. Troncature intelligente du texte source (`TEXTE_MAX`)
Les communiqués financiers peuvent faire plusieurs dizaines de pages. Envoyer tout le texte au LLM exploserait la facture (et dépasserait sa fenêtre de contexte). 
- Le fichier `pdfToText.ts` extrait uniquement les **3 000 premiers caractères max** (l'équivalent des 2 premières pages).
- C'est dans ces premières pages que se trouvent le titre, les faits marquants et les chiffres clés (le reste étant souvent des mentions légales ou des tableaux détaillés).
- Cette troncature permet de garder l'essentiel du contexte tout en divisant le coût par 10 à 15 (un PDF complet pouvant contenir entre 30k et 40k caractères).

### 3. Système de cache et d'idempotence (Zéro double dépense)
- **Vérification préalable (`findUnique`)** : Avant de télécharger un PDF et d'appeler Mistral, le service `BriefService` vérifie si une brève n'a pas déjà été générée pour cette publication. Si c'est le cas, il ignore le processus. 
- **Cycle de rafraîchissement** : L'application tourne en boucle toutes les 30 minutes pour vérifier les nouvelles publications. Grâce au cache en base de données, les publications déjà traitées ne sont **jamais** renvoyées au LLM.
- **Résultat** : Le serveur peut redémarrer ou tourner pendant des jours sans jamais payer deux fois le même appel API.

### 4. Format de sortie contraint (JSON `responseFormat`)
L'utilisation du `responseFormat: { type: "json_object" }` évite au LLM de générer des phrases d'introduction inutiles (ex: "Voici la brève..."). Le modèle génère directement le JSON, ce qui économise les tokens de sortie et garantit un parsing sans erreur.

### 5. Limitation de la charge côté frontend (Polling)
Le frontend interroge le backend toutes les 60 secondes (`setInterval`), mais celui-ci puise dans un **cache en mémoire** (mis à jour par le Cron). Cela évite de surcharger la base de données et garantit une latence quasi nulle pour l'utilisateur.

### 6. Monitoring des performances
Des chronomètres ont été ajoutés dans le service `BriefService` pour mesurer le temps exact passé sur l'extraction du PDF (`timePdf`) versus l'appel au LLM (`timeLlm`). Ces logs (ex: `📊 [PERF] ENGIE : PDF 120ms | LLM 3400ms`) permettent d'identifier rapidement les goulots d'étranglement.

---

## Idées d'amélioration
- **Contexte sémantique** : Implémenter un second agent pour vérifier non seulement la présence du chiffre, mais aussi son contexte (ex: "11,3%" doit être associé à "chiffre d'affaires").
- **Cache intelligent** : Mettre en place un cache Redis pour éviter de retélécharger les PDFs déjà analysés.
- **Tests unitaires** : Ajouter des tests avec Jest pour valider la normalisation des chiffres et le scoring.
- **Déploiement** : Déployer la base de données sur un serveur local conteneurisé sur Docker. *(J'aurais pu le faire sur un vrai projet, mais pour un exercice, Supabase ou Neon sont très bien).*
- **Domaine** : Acheter un nom de domaine cohérent avec le site (ex: bergdot.com).
- **Scalabilité** : Si le trafic augmente, augmenter le temps entre les requêtes du frontend à 2 minutes. Comme les données sont peu souvent rafraîchies, un polling de 1 minute est très agressif pour le serveur.

---

## Temps réellement passé
- **Analyse de l'API et développement du backend** (ingestion, scoring) : 15 minutes *(Claude a aidé pour comprendre rapidement les retours des curl successifs)*
- **Développement de l'extraction PDF et du service LLM** : ~1 heure 30 mins
- **Intégration du cache et du contrôle de vérification** : ~1 heure
- **Développement du frontend (React, design terminal, skeleton loader, recherche)** : ~1 heure
- **Rédaction du README et tests finaux** : ~1 heure 10 mins *(écrit + IA pour le rendre plus digeste à lire)*
- **Design frontend** : reflexion ~30 min + ~45 min  

**Total : ~7 heures 45 repartit entre jeudi soir, vendredi soir et samedi aprem du 09/07/2026 au 11/07/2026**