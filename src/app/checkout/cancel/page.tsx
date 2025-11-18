import Link from 'next/link';
import { Button } from '@/components/Button';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-6">😔</div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paiement annulé
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Votre paiement a été annulé. Aucun montant n'a été débité.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              Vos formations sont toujours dans votre panier. Vous pouvez reprendre le processus de paiement quand vous le souhaitez.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/panier">
              <Button variant="primary" size="lg">
                Retour au panier
              </Button>
            </Link>

            <Link href="/formations">
              <Button variant="outline" size="lg">
                Continuer mes achats
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
