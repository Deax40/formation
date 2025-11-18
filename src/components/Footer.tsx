import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
              Formations Pro
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-md">
              La plateforme de formations modernes pour entrepreneurs et développeurs. Apprenez à lancer, gérer et faire évoluer votre business tout en développant vos compétences techniques.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-primary font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/formations" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  Mon compte
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-semibold mb-6">Légal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/cgv" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-neutral-600 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-12 pt-8">
          <p className="text-neutral-500 text-sm text-center">
            © {new Date().getFullYear()} Formations Pro. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
