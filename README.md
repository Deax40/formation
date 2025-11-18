# FormationShop - Plateforme de vente de formations

Une plateforme moderne de vente de formations en ligne construite avec Next.js, TypeScript, Prisma, et Stripe.

## 🚀 Fonctionnalités

- **Catalogue de formations** : Affichage des formations avec système de catégories
- **Authentification** : Système d'inscription et connexion avec NextAuth
- **Panier d'achat** : Gestion du panier avec persistance utilisateur
- **Paiement sécurisé** : Intégration Stripe pour les paiements
- **Dashboard utilisateur** : Accès aux formations achetées et historique des commandes
- **Espace administrateur** :
  - Statistiques (CA, utilisateurs, commandes)
  - Gestion des utilisateurs
  - Gestion des commandes
  - Analytics des clics
- **Tracking des clics** : Système d'analytics pour suivre les interactions utilisateurs
- **Design moderne** : Interface élégante et responsive avec Tailwind CSS

## 📋 Prérequis

- Node.js 18+
- PostgreSQL (local ou distant)
- Un compte Stripe (mode test pour commencer)

## 🛠️ Installation

### 1. Cloner le projet

```bash
cd formation
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de la base de données

#### Option A : PostgreSQL local

1. Installez PostgreSQL sur votre machine
2. Créez une base de données :

```sql
CREATE DATABASE formation_db;
```

#### Option B : PostgreSQL distant (recommandé pour Vercel)

Utilisez un service comme :
- [Neon](https://neon.tech) (gratuit)
- [Supabase](https://supabase.com) (gratuit)
- [Railway](https://railway.app)

### 4. Configuration des variables d'environnement

Copiez le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos valeurs :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/formation_db"

# NextAuth (pour l'authentification)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-aleatoire-32-caracteres-minimum"

# Stripe (mode test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### Générer un secret NextAuth

```bash
openssl rand -base64 32
```

#### Obtenir les clés Stripe

1. Créez un compte sur [stripe.com](https://stripe.com)
2. Allez dans **Développeurs > Clés API**
3. Copiez la clé **publiable** dans `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Copiez la clé **secrète** dans `STRIPE_SECRET_KEY`

### 5. Initialiser la base de données

```bash
# Créer les tables
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate

# Alimenter la base avec des données de test
npm run seed
```

Le script de seed créera :
- Un compte admin : `admin@example.com` / `admin123`
- Deux comptes utilisateurs : `user1@example.com` / `user123` et `user2@example.com` / `user123`
- 3 formations (Développeur Web Full-Stack, Lancer son business en ligne, Automatisation & IA)
- Des commandes de test
- Des événements de clics pour l'analytics

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔧 Configuration Stripe Webhook (pour les paiements en production)

### En développement (local)

1. Installez Stripe CLI : [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Connectez-vous à Stripe :

```bash
stripe login
```

3. Créez un webhook local :

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Copiez le secret du webhook affiché et mettez-le dans `.env` :

```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### En production (Vercel)

1. Allez dans votre dashboard Stripe
2. **Développeurs > Webhooks > Ajouter un endpoint**
3. URL : `https://votre-domaine.vercel.app/api/webhooks/stripe`
4. Événements à écouter : `checkout.session.completed`
5. Copiez le secret du webhook dans les variables d'environnement Vercel

## 📊 Commandes utiles

```bash
# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Lancer en production
npm run start

# Ouvrir Prisma Studio (interface graphique pour la BDD)
npm run prisma:studio

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Re-seeder la base de données
npm run seed
```

## 🚀 Déploiement sur Vercel

### 1. Préparer le projet

Assurez-vous que votre projet est sur GitHub, GitLab ou Bitbucket.

### 2. Créer un projet Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **New Project**
3. Importez votre repository
4. Vercel détectera automatiquement Next.js

### 3. Configurer les variables d'environnement

Dans les paramètres du projet Vercel, ajoutez toutes les variables :

- `DATABASE_URL` : URL de votre base PostgreSQL (utilisez Neon ou Supabase)
- `NEXTAUTH_URL` : URL de votre app (ex: `https://votre-app.vercel.app`)
- `NEXTAUTH_SECRET` : Votre secret généré
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` : Clé publique Stripe
- `STRIPE_SECRET_KEY` : Clé secrète Stripe
- `STRIPE_WEBHOOK_SECRET` : Secret webhook Stripe (configuré après déploiement)

### 4. Déployer

Cliquez sur **Deploy**. Vercel va :
1. Builder votre application
2. Exécuter automatiquement `prisma generate` (grâce au `postinstall` dans package.json)
3. Déployer votre app

### 5. Initialiser la base de données en production

Après le premier déploiement, vous devez créer les tables et alimenter la base :

```bash
# Se connecter à Vercel
npx vercel login

# Lier votre projet local au projet Vercel
npx vercel link

# Exécuter les migrations
npx vercel env pull .env.local
npx prisma migrate deploy

# Alimenter la base
npx prisma db seed
```

Ou utilisez Prisma Studio en production :

```bash
# Ouvrir Prisma Studio avec la base de production
DATABASE_URL="votre-url-production" npx prisma studio
```

### 6. Configurer le webhook Stripe

1. Créez un webhook dans Stripe pointant vers `https://votre-app.vercel.app/api/webhooks/stripe`
2. Ajoutez le secret du webhook dans les variables d'environnement Vercel
3. Redéployez l'application

## 🗂️ Structure du projet

```
formation/
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   └── seed.ts                # Script de données initiales
├── src/
│   ├── app/                   # Pages et routes (App Router)
│   │   ├── admin/            # Espace administrateur
│   │   ├── api/              # API Routes
│   │   ├── checkout/         # Pages de paiement
│   │   ├── dashboard/        # Dashboard utilisateur
│   │   ├── formations/       # Pages formations
│   │   ├── login/            # Page de connexion
│   │   ├── register/         # Page d'inscription
│   │   ├── panier/           # Page panier
│   │   ├── cgv/              # Conditions générales
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Page d'accueil
│   │   └── globals.css       # Styles globaux
│   ├── components/           # Composants réutilisables
│   │   ├── Button.tsx
│   │   ├── CourseCard.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ClickTracker.tsx
│   │   └── Providers.tsx
│   ├── lib/                  # Utilitaires
│   │   ├── auth.ts          # Configuration NextAuth
│   │   ├── prisma.ts        # Client Prisma
│   │   ├── session.ts       # Helpers de session
│   │   └── stripe.ts        # Configuration Stripe
│   └── types/               # Types TypeScript
│       └── next-auth.d.ts
├── .env.example             # Exemple de variables d'environnement
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 👥 Comptes de test

Après le seed, vous pouvez vous connecter avec :

- **Admin** : `admin@example.com` / `admin123`
- **Utilisateur 1** : `user1@example.com` / `user123`
- **Utilisateur 2** : `user2@example.com` / `user123`

## 🔐 Sécurité

- Les mots de passe sont hashés avec bcrypt
- Les routes sensibles sont protégées (authentification requise)
- Les routes admin vérifient le rôle de l'utilisateur
- Les paiements sont gérés par Stripe (PCI compliant)
- Les webhooks Stripe sont vérifiés avec la signature

## 📱 Pages disponibles

### Public
- `/` - Page d'accueil
- `/formations` - Catalogue des formations
- `/formations/[slug]` - Détail d'une formation
- `/login` - Connexion
- `/register` - Inscription
- `/cgv` - Conditions générales de vente

### Utilisateur connecté
- `/dashboard` - Mes formations et commandes
- `/panier` - Panier d'achat
- `/checkout` - Page de paiement
- `/checkout/success` - Confirmation de paiement
- `/checkout/cancel` - Paiement annulé

### Administrateur
- `/admin` - Dashboard avec statistiques
- `/admin/users` - Gestion des utilisateurs
- `/admin/orders` - Gestion des commandes
- `/admin/analytics` - Analytics des clics

## 🎨 Personnalisation

### Couleurs

Modifiez `tailwind.config.js` pour changer les couleurs :

```js
colors: {
  primary: {
    DEFAULT: '#3b82f6',  // Bleu principal
    dark: '#2563eb',
    light: '#60a5fa',
  },
}
```

### Ajouter une formation

1. Utilisez Prisma Studio : `npm run prisma:studio`
2. Ou ajoutez via le seed : `prisma/seed.ts`
3. Ou créez une interface admin pour gérer les formations

## 🐛 Troubleshooting

### Erreur de connexion à la base de données

- Vérifiez que PostgreSQL est bien démarré
- Vérifiez la `DATABASE_URL` dans `.env`
- Testez la connexion : `npx prisma db pull`

### Erreur Stripe

- Vérifiez vos clés API Stripe
- Assurez-vous d'être en mode test
- Vérifiez le webhook si les paiements ne se confirment pas

### Erreur NextAuth

- Vérifiez `NEXTAUTH_SECRET` (doit être défini)
- Vérifiez `NEXTAUTH_URL` (doit correspondre à votre domaine)

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation NextAuth](https://next-auth.js.org)
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 📄 Licence

Ce projet est un exemple éducatif. Libre à vous de l'utiliser et le modifier selon vos besoins.

## 🤝 Support

Pour toute question ou problème :
- Consultez la documentation ci-dessus
- Vérifiez les logs de votre application
- Utilisez Prisma Studio pour inspecter la base de données

---

Développé avec ❤️ avec Next.js, TypeScript et Tailwind CSS
