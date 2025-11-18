'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import Link from 'next/link';

interface CartItem {
  id: string;
  course: {
    id: string;
    slug: string;
    title: string;
    price: number;
    category: string;
  };
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/checkout');
      return;
    }

    if (status === 'authenticated') {
      fetchCart();
    }
  }, [status, router]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Rediriger vers Stripe Checkout
        window.location.href = data.url;
      } else {
        alert(data.error || 'Erreur lors de la création de la session de paiement');
        setProcessing(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de la session de paiement');
      setProcessing(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.course.price, 0);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des formations à votre panier avant de procéder au paiement
            </p>
            <Link href="/formations">
              <Button variant="primary">Voir les formations</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Récapitulatif du panier */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Récapitulatif de votre commande
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.course.title}</h3>
                      <p className="text-sm text-gray-600">{item.course.category}</p>
                    </div>
                    <span className="font-bold text-gray-900">
                      {item.course.price.toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total et paiement */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Total</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>TVA</span>
                  <span>Incluse</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                disabled={processing}
              >
                {processing ? 'Redirection...' : 'Procéder au paiement'}
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  🔒 Paiement sécurisé par Stripe
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Accès immédiat aux formations</li>
                  <li>✓ Accès à vie</li>
                  <li>✓ Tous les contenus</li>
                  <li>✓ Support client</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
