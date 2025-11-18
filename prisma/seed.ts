import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed...');

  // Créer un admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin créé:', admin.email);

  // Créer quelques utilisateurs de test
  const userPassword = await bcrypt.hash('user123', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'Marie Dupont',
      passwordHash: userPassword,
      role: 'USER',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'Jean Martin',
      passwordHash: userPassword,
      role: 'USER',
    },
  });
  console.log('✅ Utilisateurs de test créés');

  // Créer les formations
  const course1 = await prisma.course.upsert({
    where: { slug: 'developpeur-web-full-stack' },
    update: {},
    create: {
      slug: 'developpeur-web-full-stack',
      title: 'Développeur Web Full-Stack',
      subtitle: 'Maîtrisez le développement web de A à Z',
      description: 'Apprenez à créer des applications web modernes avec React, Node.js, et PostgreSQL. Cette formation complète vous guidera du frontend au backend.',
      content: `## Programme de la formation

### Module 1 : Introduction au développement web
- Les bases de HTML, CSS et JavaScript
- Comprendre le fonctionnement d'Internet
- Les outils du développeur moderne

### Module 2 : Frontend avec React
- Les fondamentaux de React
- Hooks et gestion d'état
- React Router et navigation
- Styling avec Tailwind CSS

### Module 3 : Backend avec Node.js
- Introduction à Node.js et Express
- API REST et principes RESTful
- Authentication et sécurité
- Base de données PostgreSQL avec Prisma

### Module 4 : Déploiement et production
- Git et GitHub
- Déploiement sur Vercel
- Bonnes pratiques de production
- Monitoring et maintenance`,
      price: 399.99,
      category: 'Codage',
      level: 'Débutant',
      duration: '40 heures',
    },
  });

  const course2 = await prisma.course.upsert({
    where: { slug: 'lancer-son-business-en-ligne' },
    update: {},
    create: {
      slug: 'lancer-son-business-en-ligne',
      title: 'Lancer son business en ligne',
      subtitle: 'De l\'idée au premier client',
      description: 'Découvrez comment créer, lancer et développer votre business en ligne de manière rentable et durable.',
      content: `## Programme de la formation

### Module 1 : Trouver son idée de business
- Identifier une niche rentable
- Valider son idée de produit/service
- Analyser la concurrence
- Définir sa proposition de valeur unique

### Module 2 : Créer son offre
- Structurer son offre
- Pricing et stratégie tarifaire
- Créer une offre irrésistible
- Packaging et présentation

### Module 3 : Marketing digital
- Bases du marketing en ligne
- Stratégie de contenu
- Publicité Facebook et Google Ads
- Email marketing et automation

### Module 4 : Vendre et scaler
- Tunnels de vente efficaces
- Techniques de closing
- Service client et rétention
- Automatisation et scaling`,
      price: 299.99,
      category: 'Entrepreneuriat',
      level: 'Débutant',
      duration: '25 heures',
    },
  });

  const course3 = await prisma.course.upsert({
    where: { slug: 'automatisation-ia-entrepreneurs' },
    update: {},
    create: {
      slug: 'automatisation-ia-entrepreneurs',
      title: 'Automatisation & IA pour entrepreneurs',
      subtitle: 'Gagnez du temps avec l\'intelligence artificielle',
      description: 'Apprenez à utiliser les outils d\'IA et d\'automatisation pour optimiser votre business et gagner un temps précieux.',
      content: `## Programme de la formation

### Module 1 : Introduction à l'IA pour les entrepreneurs
- Panorama des outils d'IA disponibles
- ChatGPT, Midjourney, et autres outils populaires
- Cas d'usage concrets
- Limites et bonnes pratiques

### Module 2 : Automatisation des tâches répétitives
- Zapier et Make (Integromat)
- Automatisation des emails
- Automatisation des réseaux sociaux
- Workflows intelligents

### Module 3 : IA pour le contenu
- Génération de texte avec l'IA
- Création d'images et de vidéos
- Optimisation SEO avec l'IA
- Personal branding assisté par IA

### Module 4 : IA pour la productivité
- Assistant virtuel IA
- Analyse de données avec l'IA
- Prise de décision assistée
- Veille concurrentielle automatisée`,
      price: 249.99,
      category: 'Automatisation & IA',
      level: 'Intermédiaire',
      duration: '20 heures',
    },
  });

  console.log('✅ Formations créées');

  // Créer quelques commandes de test
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      totalAmount: 399.99,
      paymentStatus: 'paid',
      orderItems: {
        create: [
          {
            courseId: course1.id,
            priceAtPurchase: 399.99,
          },
        ],
      },
    },
  });

  // Associer la formation à l'utilisateur
  await prisma.userCourse.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      totalAmount: 549.98,
      paymentStatus: 'paid',
      orderItems: {
        create: [
          {
            courseId: course2.id,
            priceAtPurchase: 299.99,
          },
          {
            courseId: course3.id,
            priceAtPurchase: 249.99,
          },
        ],
      },
    },
  });

  // Associer les formations à l'utilisateur 2
  await prisma.userCourse.createMany({
    data: [
      { userId: user2.id, courseId: course2.id },
      { userId: user2.id, courseId: course3.id },
    ],
  });

  console.log('✅ Commandes de test créées');

  // Créer quelques événements de clics
  await prisma.clickEvent.createMany({
    data: [
      { userId: user1.id, path: '/', elementId: 'hero-cta-formations' },
      { userId: user1.id, path: '/', elementId: 'hero-cta-register' },
      { userId: user2.id, path: '/formations', elementId: 'add-to-cart-course-1' },
      { userId: user2.id, path: '/formations', elementId: 'view-course-2' },
      { path: '/', elementId: 'hero-cta-formations' }, // Événement anonyme
      { path: '/formations', elementId: 'view-course-1' },
    ],
  });

  console.log('✅ Événements de clics créés');
  console.log('🎉 Seed terminé avec succès!');
  console.log('\n📝 Informations de connexion:');
  console.log('Admin: admin@example.com / admin123');
  console.log('User 1: user1@example.com / user123');
  console.log('User 2: user2@example.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
