'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockFormations } from '@/data/mock-data';

export default function FormationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const formation = mockFormations.find(f => f.slug === slug);

  if (!formation) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-primary mb-4">Formation non trouvée</h1>
          <Link
            href="/formations"
            className="text-accent hover:text-accent-dark font-medium"
          >
            Retour aux formations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span>/</span>
            <Link href="/formations" className="hover:text-primary">Formations</Link>
            <span>/</span>
            <span className="text-primary">{formation.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-8">
                <div className="text-9xl">
                  {formation.category === 'Entrepreneuriat' && '🚀'}
                  {formation.category === 'Codage' && '💻'}
                  {formation.category === 'Gestion' && '📊'}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm">
                  {formation.category}
                </span>
                <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium text-sm">
                  {formation.level}
                </span>
                <span className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formation.duration}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                {formation.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-neutral-600 mb-8">
                {formation.subtitle}
              </p>

              {/* Stats */}
              {(formation.students || formation.rating) && (
                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-neutral-200">
                  {formation.students && (
                    <div className="flex items-center gap-2 text-neutral-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="font-semibold">{formation.students}</span> étudiants
                    </div>
                  )}
                  {formation.rating && (
                    <div className="flex items-center gap-2 text-neutral-700">
                      <svg className="w-5 h-5 text-accent fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-semibold">{formation.rating}/5</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  À propos de cette formation
                </h2>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {formation.description}
                </p>
              </div>

              {/* Modules */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Programme de la formation
                </h2>
                <div className="space-y-3">
                  {formation.modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-semibold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900">{module}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32"
            >
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-soft">
                <div className="text-4xl font-bold text-primary mb-6">
                  {formation.price}€
                </div>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => router.push('/login')}
                    className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transform hover:scale-105 transition-all duration-200 shadow-soft"
                  >
                    Acheter maintenant
                  </button>
                  <button
                    onClick={() => router.push('/panier')}
                    className="w-full px-6 py-4 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-neutral-50 transition-all duration-200"
                  >
                    Ajouter au panier
                  </button>
                </div>

                <div className="space-y-4 text-sm text-neutral-700">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Accès illimité à vie</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certificat de completion</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Support disponible 24/7</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Garantie 30 jours satisfait ou remboursé</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
