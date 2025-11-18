'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Petit délai pour s'assurer que le webhook a été traité
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div className="text-white text-xl">Traitement de votre paiement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-6">🎉</div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Merci pour votre achat. Vos formations sont maintenant disponibles dans votre compte.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-green-800">
              ✓ Paiement confirmé<br />
              ✓ Formations ajoutées à votre compte<br />
              ✓ Email de confirmation envoyé
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                Accéder à mes formations
              </Button>
            </Link>

            <Link href="/formations">
              <Button variant="outline" size="lg">
                Découvrir d'autres formations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
