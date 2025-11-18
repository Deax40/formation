'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './Button';

export function Header() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <header className="bg-dark-light border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-primary transition-colors">
            FormationShop
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="/formations" className="text-gray-300 hover:text-white transition-colors">
              Formations
            </Link>
            {session && (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Mon compte
                </Link>
                <Link href="/panier" className="text-gray-300 hover:text-white transition-colors">
                  Panier
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="text-primary hover:text-primary-light transition-colors font-semibold">
                    Admin
                  </Link>
                )}
              </>
            )}
            <Link href="/cgv" className="text-gray-300 hover:text-white transition-colors">
              CGV
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="text-gray-400">Chargement...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Bonjour, {session.user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-3">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
            Accueil
          </Link>
          <Link href="/formations" className="text-gray-300 hover:text-white transition-colors text-sm">
            Formations
          </Link>
          {session && (
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
                Mon compte
              </Link>
              <Link href="/panier" className="text-gray-300 hover:text-white transition-colors text-sm">
                Panier
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-primary hover:text-primary-light transition-colors text-sm font-semibold">
                  Admin
                </Link>
              )}
            </>
          )}
          <Link href="/cgv" className="text-gray-300 hover:text-white transition-colors text-sm">
            CGV
          </Link>
        </nav>
      </div>
    </header>
  );
}
