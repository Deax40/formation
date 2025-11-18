import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark-light border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">FormationShop</h3>
            <p className="text-gray-400 text-sm">
              La plateforme de formations en codage, entrepreneuriat et intelligence artificielle.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/formations" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mon compte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cgv" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Conditions Générales de Vente
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">
              Email: contact@formationshop.fr
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Support disponible 7j/7
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FormationShop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
