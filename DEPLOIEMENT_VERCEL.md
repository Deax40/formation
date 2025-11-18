# 🚀 DÉPLOIEMENT DIRECT SUR VERCEL

Ce guide vous permet de déployer l'application directement sur Vercel en ligne, sans configuration locale.

---

## 📋 PRÉREQUIS

1. Un compte GitHub (vous avez déjà le repo: https://github.com/Deax40/formation.git)
2. Un compte Vercel (gratuit) → https://vercel.com
3. Un compte Stripe (gratuit, mode test) → https://stripe.com

---

## 🎯 ÉTAPE 1 : CRÉER UN COMPTE VERCEL

1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre GitHub

---

## 🔗 ÉTAPE 2 : IMPORTER LE PROJET

1. Sur le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Vous verrez vos repositories GitHub
3. Trouvez **"formation"** et cliquez sur **"Import"**
4. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js

---

## ⚙️ ÉTAPE 3 : CONFIGURER LES VARIABLES D'ENVIRONNEMENT

**IMPORTANT** : Avant de cliquer sur "Deploy", vous DEVEZ configurer les variables d'environnement.

### 3.1 Dans la section "Environment Variables", ajoutez :

#### ✅ Variables déjà prêtes (copiez-collez directement) :

**DATABASE_URL**
```
postgres://6362dbb90991a08d7e7d1125abf082a7d741f351e94acf5e258fcdec99054594:sk_ewEq0lo1pYhl7L_Mj2Jve@db.prisma.io:5432/postgres?sslmode=require
```

**NEXTAUTH_SECRET**
```
XuRBCcDHfyiyT7Jq0KrP/swr9UxeEu+zVYG6naRz7BQ=
```

**PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING** (important pour éviter les erreurs)
```
1
```

---

#### ⚠️ Variables à configurer selon votre domaine Vercel :

**NEXTAUTH_URL**

Vercel vous donnera un domaine automatique comme :
```
https://formation-abc123.vercel.app
```

Pour l'instant, mettez temporairement :
```
https://formation.vercel.app
```

*Vous pourrez le changer après le premier déploiement*

---

#### 🔷 Variables Stripe (à récupérer de votre compte Stripe) :

**NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
```
pk_test_VOTRE_CLE_PUBLIQUE_STRIPE
```

**STRIPE_SECRET_KEY**
```
sk_test_VOTRE_CLE_SECRETE_STRIPE
```

**STRIPE_WEBHOOK_SECRET**
```
whsec_TEMPORAIRE
```
*Vous configurerez le vrai webhook après le déploiement*

---

### 3.2 Comment obtenir les clés Stripe rapidement :

1. **Créez un compte Stripe** : https://stripe.com
2. **Activez le mode TEST** (toggle en haut à droite)
3. Allez dans **Développeurs → Clés API**
4. Copiez :
   - **Clé publiable** (pk_test_...) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Clé secrète** (sk_test_...) → `STRIPE_SECRET_KEY`

---

## 🚀 ÉTAPE 4 : DÉPLOYER

Une fois toutes les variables ajoutées :

1. Cliquez sur **"Deploy"**
2. Vercel va :
   - Installer les dépendances
   - Générer Prisma Client
   - Builder l'application
   - Déployer

⏱️ **Durée** : 2-3 minutes

---

## 🔧 ÉTAPE 5 : APRÈS LE PREMIER DÉPLOIEMENT

### 5.1 Mettre à jour NEXTAUTH_URL

1. Vercel vous donne l'URL finale (ex: `https://formation-abc123.vercel.app`)
2. Allez dans **Settings → Environment Variables**
3. Modifiez `NEXTAUTH_URL` avec votre vraie URL
4. Cliquez sur **Save**
5. Allez dans **Deployments** → Cliquez sur **"Redeploy"** (sur le dernier déploiement)

### 5.2 Initialiser la base de données

**Option A - Via Vercel CLI (recommandé)**

```bash
# Installez Vercel CLI
npm i -g vercel

# Connectez-vous
vercel login

# Liez votre projet
vercel link

# Téléchargez les variables d'environnement
vercel env pull .env.local

# Exécutez les migrations
npx prisma migrate deploy

# Seedez la base
npm run seed
```

**Option B - Via Prisma Studio en ligne**

```bash
# En local, avec l'URL de production
DATABASE_URL="postgres://6362dbb90991a08d7e7d1125abf082a7d741f351e94acf5e258fcdec99054594:sk_ewEq0lo1pYhl7L_Mj2Jve@db.prisma.io:5432/postgres?sslmode=require" npx prisma migrate deploy

DATABASE_URL="postgres://6362dbb90991a08d7e7d1125abf082a7d741f351e94acf5e258fcdec99054594:sk_ewEq0lo1pYhl7L_Mj2Jve@db.prisma.io:5432/postgres?sslmode=require" npm run seed
```

### 5.3 Configurer le Webhook Stripe en production

1. Allez dans le **Dashboard Stripe**
2. **Développeurs → Webhooks**
3. Cliquez sur **"Ajouter un endpoint"**
4. URL : `https://votre-app.vercel.app/api/webhooks/stripe`
5. Événements : Sélectionnez `checkout.session.completed`
6. Créez le webhook
7. Copiez le **"Secret de signature"** (commence par `whsec_`)
8. Dans Vercel → **Settings → Environment Variables**
9. Modifiez `STRIPE_WEBHOOK_SECRET` avec la vraie valeur
10. **Redéployez** l'application

---

## ✅ ÉTAPE 6 : VÉRIFIER QUE TOUT FONCTIONNE

1. Ouvrez votre site : `https://votre-app.vercel.app`
2. Testez la connexion avec : `admin@example.com` / `admin123`
3. Si la connexion ne fonctionne pas, c'est que la base n'est pas initialisée → Retournez à l'étape 5.2
4. Testez un paiement avec la carte : `4242 4242 4242 4242`

---

## 🎯 RÉCAPITULATIF DES VARIABLES D'ENVIRONNEMENT VERCEL

Voici toutes les variables à ajouter dans Vercel :

| Variable | Valeur | Status |
|----------|--------|--------|
| `DATABASE_URL` | `postgres://6362dbb90991a08d7e7d1125abf082a7d741f351e94acf5e258fcdec99054594:sk_ewEq0lo1pYhl7L_Mj2Jve@db.prisma.io:5432/postgres?sslmode=require` | ✅ Prêt |
| `NEXTAUTH_URL` | `https://votre-app.vercel.app` | ⚠️ À ajuster après déploiement |
| `NEXTAUTH_SECRET` | `XuRBCcDHfyiyT7Jq0KrP/swr9UxeEu+zVYG6naRz7BQ=` | ✅ Prêt |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | ⚠️ À récupérer de Stripe |
| `STRIPE_SECRET_KEY` | `sk_test_...` | ⚠️ À récupérer de Stripe |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | ⚠️ À configurer après déploiement |
| `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING` | `1` | ✅ Prêt |

---

## 🆘 RÉSOLUTION DES PROBLÈMES

### ❌ Erreur Prisma lors du build

**Symptôme** : `Failed to fetch sha256 checksum`

**Solution** : Vérifiez que la variable `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` est bien ajoutée

---

### ❌ Erreur "Invalid `prisma.user.findUnique()`"

**Symptôme** : Erreur lors de la connexion

**Solution** : La base de données n'est pas initialisée. Exécutez :
```bash
vercel env pull .env.local
npx prisma migrate deploy
npm run seed
```

---

### ❌ Erreur NextAuth "Configuration error"

**Symptôme** : Erreur lors de la connexion

**Solution** : Vérifiez que `NEXTAUTH_URL` correspond exactement à votre URL Vercel (avec https://)

---

### ❌ Webhook Stripe ne fonctionne pas

**Symptôme** : Les paiements ne se confirment pas

**Solution** :
1. Vérifiez que le webhook est créé dans Stripe (Production mode)
2. URL du webhook : `https://votre-app.vercel.app/api/webhooks/stripe`
3. Événement sélectionné : `checkout.session.completed`
4. Secret correctement ajouté dans Vercel
5. Application redéployée après l'ajout du secret

---

## 🎉 FÉLICITATIONS !

Votre application est maintenant en ligne sur Vercel ! 🚀

### Comptes de test disponibles :
- **Admin** : `admin@example.com` / `admin123`
- **User 1** : `user1@example.com` / `user123`
- **User 2** : `user2@example.com` / `user123`

### Pages disponibles :
- 🏠 Accueil : `https://votre-app.vercel.app`
- 📚 Formations : `https://votre-app.vercel.app/formations`
- 👑 Admin : `https://votre-app.vercel.app/admin`

---

## 📞 SUPPORT

- **Documentation Vercel** : https://vercel.com/docs
- **Dashboard Vercel** : https://vercel.com/dashboard
- **Logs en temps réel** : Dans Vercel → Votre projet → Deployments → View Function Logs
