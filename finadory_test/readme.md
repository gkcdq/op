# Finadory - Veille Financière & IA

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
> *"Tu es un journaliste financier. À partir du texte ci-dessous, rédige une brève de 100 à 150 mots en français."*

### 2. Prompt de consigne
> *"Attention, tu dois impérativement respecter ce format JSON, sans rien ajouter d'autre :*
> *{ "titre": "Un titre percutant", "breve": "Le texte de la brève...", "chiffres_cles": ["11,3%", "492,8 M€", "9,2%"] }*
> *Règles :*
> *1. Le champ "chiffres_cles" doit être un tableau (array) contenant TOUS les nombres, pourcentages et montants en euros cités dans ta brève.*
> *2. N'invente aucun chiffre. Si tu ne trouves pas de chiffres, renvoie un tableau vide []."*

### 3. Prompt de contexte applicatif
> *"Texte source : ${pdf.texte}"*

### Erreur de l'IA détectée
Lors des tests, le LLM a généré une brève pour **ENGIE** en utilisant des chiffres (`11,3%`, `492,8 M€`, `9,2%`) qui n'apparaissaient pas dans le communiqué d'ENGIE (le LLM a mélangé avec les données d'un autre communiqué ou d'une autre page du PDF). **Grâce aux fonctions de vérification, ces chiffres ont été immédiatement identifiés comme introuvables**, et la brève a été marquée `PARTIEL` avec un message d'erreur explicite.

---

## Idées d'amélioration
- **Contexte sémantique** : Implémenter un second agent pour vérifier non seulement la présence du chiffre, mais aussi son contexte (ex: "11,3%" doit être associé à "chiffre d'affaires").
- **Cache intelligent** : Mettre en place un cache Redis pour éviter de retélécharger les PDFs déjà analysés.
- **Tests unitaires** : Ajouter des tests avec Jest pour valider la normalisation des chiffres et le scoring.
- **Déploiement** : Déployer la base de données sur un serveur local conteneurisé sur Docker. *(J'aurais pu le faire sur un vrai projet, mais pour un exercice, Supabase ou Neon (autre cloud db utilisé côté dev sur des projets persos) sont très bien).*

---

## Temps réellement passé
- **Analyse de l'API et développement du backend** (ingestion, scoring) : 15 minutes *(Claude a aidé pour comprendre rapidement les retours des curl successifs)*
- **Développement de l'extraction PDF et du service LLM** : ~1 heure 30
- **Intégration du cache et du contrôle de vérification** : ~1 heure
- **Rédaction du README et tests finaux** : ~1 heure 30 (plus ia pour le rendre plus digest a lire)

**Total : ~5 heures 30**