# 🔧 Guide de Configuration - FormationShop

## ✅ Code pushé sur GitHub

Le code a été poussé avec succès sur : **https://github.com/Deax40/formation.git**

---

## 📋 Variables d'environnement à configurer

Vous devez créer un fichier `.env` à la racine du projet avec les variables suivantes :

### 1️⃣ BASE DE DONNÉES (PostgreSQL)

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

**Options recommandées (GRATUITES) :**

#### Option A : Neon (Recommandé pour Vercel)
1. Allez sur https://neon.tech
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Copiez la "Connection string" (commence par `postgresql://`)
5. Collez-la dans `DATABASE_URL`

Exemple :
```env
DATABASE_URL="postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb"
```

#### Option B : Supabase
1. Allez sur https://supabase.com
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Allez dans Settings > Database
5. Copiez la "Connection string" en mode "Transaction"
6. Remplacez `[YOUR-PASSWORD]` par votre mot de passe

Exemple :
```env
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

#### Option C : Local (PostgreSQL installé sur votre machine)
```env
DATABASE_URL="postgresql://postgres:votreMotDePasse@localhost:5432/formation_db"
```

---

### 2️⃣ NEXTAUTH (Authentification)

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-tres-long-et-aleatoire"
```

**Comment générer le secret :**

**Sur Windows (PowerShell) :**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Sur Mac/Linux :**
```bash
openssl rand -base64 32
```

**Ou utilisez ce générateur en ligne :**
https://generate-secret.vercel.app/32

**⚠️ Important :**
- En production (Vercel), remplacez `NEXTAUTH_URL` par votre vraie URL : `https://votre-app.vercel.app`
- Le `NEXTAUTH_SECRET` doit faire au moins 32 caractères

Exemple :
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ab12cd34ef56gh78ij90kl12mn34op56qr78st90uv12wx34yz56"
```

---

### 3️⃣ STRIPE (Paiements)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Comment obtenir les clés Stripe :**

1. **Créer un compte Stripe :**
   - Allez sur https://stripe.com
   - Cliquez sur "Commencer" et créez un compte gratuit
   - Activez le **mode test** (toggle en haut à droite)

2. **Récupérer les clés API :**
   - Allez dans **Développeurs > Clés API**
   - Copiez la **Clé publiable** (commence par `pk_test_`) → mettez-la dans `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Cliquez sur "Afficher la clé secrète de test"
   - Copiez la **Clé secrète** (commence par `sk_test_`) → mettez-la dans `STRIPE_SECRET_KEY`

3. **Configurer le Webhook (important pour les paiements) :**

   **EN DÉVELOPPEMENT LOCAL :**

   a. Installez Stripe CLI :
      - Windows : https://github.com/stripe/stripe-cli/releases/latest
      - Mac : `brew install stripe/stripe-cli/stripe`
      - Linux : `brew install stripe/stripe-cli/stripe`

   b. Connectez-vous :
   ```bash
   stripe login
   ```

   c. Lancez le webhook en local :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   d. Copiez le secret qui s'affiche (commence par `whsec_`) et mettez-le dans `STRIPE_WEBHOOK_SECRET`

   **EN PRODUCTION (Vercel) :**

   a. Allez dans votre dashboard Stripe
   b. **Développeurs > Webhooks > Ajouter un endpoint**
   c. URL : `https://votre-app.vercel.app/api/webhooks/stripe`
   d. Événements à écouter : sélectionnez `checkout.session.completed`
   e. Créez le webhook
   f. Copiez le **Secret de signature** et ajoutez-le dans les variables d'environnement Vercel

Exemple complet :
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51abcdefghijklmnopqrstuvwxyz1234567890"
STRIPE_SECRET_KEY="sk_test_51abcdefghijklmnopqrstuvwxyz1234567890"
STRIPE_WEBHOOK_SECRET="whsec_abcdefghijklmnopqrstuvwxyz1234567890"
```

---

## 📝 Fichier .env COMPLET - Exemple

Créez un fichier `.env` à la racine du projet avec ce contenu (en remplaçant par vos vraies valeurs) :

```env
# Base de données PostgreSQL (Neon, Supabase, ou local)
DATABASE_URL="postgresql://username:password@host:5432/database"

# NextAuth (Authentification)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ab12cd34ef56gh78ij90kl12mn34op56qr78st90uv12wx34yz56"

# Stripe (Paiements en mode TEST)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51abcdefghijklmnopqrstuvwxyz1234567890"
STRIPE_SECRET_KEY="sk_test_51abcdefghijklmnopqrstuvwxyz1234567890"
STRIPE_WEBHOOK_SECRET="whsec_abcdefghijklmnopqrstuvwxyz1234567890"
```

---

## 🚀 Installation et démarrage

Une fois que vous avez configuré le fichier `.env` :

### 1. Installer les dépendances
```bash
npm install
```

### 2. Créer les tables dans la base de données
```bash
npx prisma migrate dev --name init
```

### 3. Générer le client Prisma
```bash
npx prisma generate
```

### 4. Alimenter la base avec des données de test
```bash
npm run seed
```

Cela créera :
- ✅ Un compte admin : `admin@example.com` / `admin123`
- ✅ Deux utilisateurs : `user1@example.com` / `user123` et `user2@example.com` / `user123`
- ✅ 3 formations (Développeur Web, Business en ligne, IA & Automatisation)
- ✅ Commandes et clics de démonstration

### 5. Lancer le serveur de développement
```bash
npm run dev
```

### 6. Ouvrir l'application
Allez sur http://localhost:3000

---

## 🌐 Déploiement sur Vercel

### 1. Connectez votre repository GitHub à Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "New Project"
3. Importez votre repository GitHub `Deax40/formation`
4. Vercel détectera automatiquement Next.js

### 2. Configurez les variables d'environnement dans Vercel
Dans les paramètres du projet Vercel, ajoutez toutes ces variables :

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://votre-app.vercel.app
NEXTAUTH_SECRET=votre-secret-32-caracteres
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Déployez
Cliquez sur "Deploy"

### 4. Après le déploiement, initialisez la base de données
```bash
# Installez Vercel CLI
npm i -g vercel

# Connectez-vous
vercel login

# Liez le projet
vercel link

# Téléchargez les variables d'env
vercel env pull .env.local

# Exécutez les migrations
npx prisma migrate deploy

# Seedez la base
npm run seed
```

### 5. Configurez le webhook Stripe en production
1. Dashboard Stripe > Développeurs > Webhooks
2. Ajoutez l'endpoint : `https://votre-app.vercel.app/api/webhooks/stripe`
3. Événement : `checkout.session.completed`
4. Copiez le nouveau secret et mettez-le à jour dans les variables d'environnement Vercel
5. Redéployez l'application

---

## ✅ Vérification que tout fonctionne

1. **Page d'accueil** : http://localhost:3000 ✓
2. **Connexion admin** : admin@example.com / admin123 ✓
3. **Dashboard admin** : http://localhost:3000/admin ✓
4. **Catalogue formations** : http://localhost:3000/formations ✓
5. **Tester un paiement** : Utilisez la carte test Stripe `4242 4242 4242 4242` avec n'importe quelle date future et CVC ✓

---

## 🆘 Besoin d'aide ?

- **Problème de base de données** : Vérifiez que `DATABASE_URL` est correct
- **Erreur Stripe** : Vérifiez que vous êtes en mode TEST et que les clés commencent bien par `pk_test_` et `sk_test_`
- **Erreur NextAuth** : Vérifiez que `NEXTAUTH_SECRET` fait bien 32+ caractères
- **Webhook ne fonctionne pas** : Assurez-vous que Stripe CLI est lancé (`stripe listen --forward-to...`)

---

## 📞 Support

Consultez le README.md pour plus de détails sur l'architecture et les fonctionnalités.

**Bon développement ! 🚀**
