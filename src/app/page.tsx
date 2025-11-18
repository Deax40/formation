import Link from 'next/link';
import { Button } from '@/components/Button';
import { ClickTracker } from '@/components/ClickTracker';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark-light to-dark py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Video placeholder */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-800 aspect-video flex items-center justify-center">
              <div className="text-gray-400">
                <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                <p className="text-sm">Vidéo de présentation</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Formations en codage & entrepreneuriat
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Développez vos compétences et lancez votre carrière avec nos formations professionnelles
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ClickTracker elementId="hero-cta-formations">
                <Link href="/formations">
                  <Button variant="primary" size="lg">
                    Voir les formations
                  </Button>
                </Link>
              </ClickTracker>

              <ClickTracker elementId="hero-cta-register">
                <Link href="/register">
                  <Button variant="outline" size="lg">
                    Créer un compte
                  </Button>
                </Link>
              </ClickTracker>
            </div>
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir FormationShop ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Formations pratiques</h3>
              <p className="text-gray-600">
                Des formations axées sur la pratique avec des projets réels pour développer vos compétences concrètement.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accès immédiat</h3>
              <p className="text-gray-600">
                Commencez à apprendre dès maintenant. Accès à vie à tous les contenus de vos formations.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Qualité garantie</h3>
              <p className="text-gray-600">
                Formations créées par des experts avec des années d'expérience dans leurs domaines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories de formations */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Nos formations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ClickTracker elementId="category-codage">
              <Link href="/formations">
                <div className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="text-5xl mb-4">💻</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Codage</h3>
                  <p className="text-gray-600 mb-4">
                    Maîtrisez le développement web et devenez développeur full-stack professionnel.
                  </p>
                  <div className="text-primary font-semibold">Découvrir →</div>
                </div>
              </Link>
            </ClickTracker>

            <ClickTracker elementId="category-entrepreneuriat">
              <Link href="/formations">
                <div className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Entrepreneuriat</h3>
                  <p className="text-gray-600 mb-4">
                    Lancez et développez votre business en ligne de manière rentable et durable.
                  </p>
                  <div className="text-primary font-semibold">Découvrir →</div>
                </div>
              </Link>
            </ClickTracker>

            <ClickTracker elementId="category-ia">
              <Link href="/formations">
                <div className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="text-5xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Automatisation & IA</h3>
                  <p className="text-gray-600 mb-4">
                    Exploitez la puissance de l'IA pour automatiser et optimiser votre activité.
                  </p>
                  <div className="text-primary font-semibold">Découvrir →</div>
                </div>
              </Link>
            </ClickTracker>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Ce que disent nos étudiants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Marie D.</h4>
                  <p className="text-sm text-gray-600">Développeuse Web</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Grâce à cette formation, j'ai pu me reconvertir dans le développement web en seulement 6 mois. Le contenu est clair et très pratique !"
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Jean M.</h4>
                  <p className="text-sm text-gray-600">Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "J'ai lancé mon business en ligne grâce aux conseils de cette formation. En 3 mois, j'ai déjà mes premiers clients !"
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sophie L.</h4>
                  <p className="text-sm text-gray-600">Consultante</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Les formations sur l'IA m'ont permis d'automatiser 80% de mes tâches répétitives. Un gain de temps incroyable !"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'étudiants qui ont déjà transformé leur carrière
          </p>
          <ClickTracker elementId="cta-final-formations">
            <Link href="/formations">
              <Button variant="secondary" size="lg">
                Découvrir toutes les formations
              </Button>
            </Link>
          </ClickTracker>
        </div>
      </section>
    </div>
  );
}
