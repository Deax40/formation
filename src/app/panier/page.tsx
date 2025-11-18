'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';

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

export default function PanierPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/panier');
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

  const handleRemoveFromCart = async (courseId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.course.id !== courseId));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.course.price, 0);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement du panier...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Mon panier</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-6">
              Découvrez nos formations et ajoutez-les à votre panier
            </p>
            <Link href="/formations">
              <Button variant="primary">Voir les formations</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/formations/${item.course.slug}`}
                        className="text-xl font-bold text-gray-900 hover:text-primary transition-colors"
                      >
                        {item.course.title}
                      </Link>
                      <p className="text-gray-600 mt-1">{item.course.category}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="text-2xl font-bold text-gray-900">
                        {item.course.price.toFixed(2)} €
                      </span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.course.id)}
                      >
                        Retirer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-gray-900">
                  {total.toFixed(2)} €
                </span>
              </div>

              <Link href="/checkout">
                <Button variant="primary" size="lg" fullWidth>
                  Passer au paiement
                </Button>
              </Link>

              <Link href="/formations" className="block mt-4">
                <Button variant="outline" size="md" fullWidth>
                  Continuer mes achats
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
