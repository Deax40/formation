'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { ClickTracker } from '@/components/ClickTracker';

interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  content: string;
  price: number;
  category: string;
  level: string;
  duration: string;
}

interface CourseDetailClientProps {
  course: Course;
  isPurchased: boolean;
}

export function CourseDetailClient({ course, isPurchased }: CourseDetailClientProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/formations/${course.slug}`);
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id }),
      });

      if (response.ok) {
        alert('Formation ajoutée au panier !');
        router.push('/panier');
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de l\'ajout au panier');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout au panier');
    }
  };

  const categoryColors: Record<string, string> = {
    'Codage': 'bg-blue-500',
    'Entrepreneuriat': 'bg-green-500',
    'Automatisation & IA': 'bg-purple-500',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`${categoryColors[course.category] || 'bg-gray-500'} text-white text-sm font-bold px-4 py-2 rounded-full`}>
              {course.category}
            </span>
            <span className="text-gray-600">{course.level}</span>
            <span className="text-gray-600">⏱️ {course.duration}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>

          {course.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{course.subtitle}</p>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div>
              <span className="text-4xl font-bold text-gray-900">
                {course.price.toFixed(2)} €
              </span>
            </div>

            <div>
              {isPurchased ? (
                <div className="text-green-600 font-bold text-lg bg-green-50 px-6 py-3 rounded-lg">
                  ✓ Formation déjà achetée
                </div>
              ) : (
                <ClickTracker elementId={`add-to-cart-detail-${course.slug}`}>
                  <Button variant="primary" size="lg" onClick={handleAddToCart}>
                    Ajouter au panier
                  </Button>
                </ClickTracker>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de cette formation</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
        </div>

        {/* Programme */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Programme de la formation</h2>
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700">
              {course.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('### ', '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="ml-6 mb-2">{line.replace('- ', '')}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="mb-4">{line}</p>;
                }
              })}
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        {!isPurchased && (
          <div className="mt-8 bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à commencer cette formation ?
            </h3>
            <p className="text-white/90 mb-6">
              Accès immédiat et à vie à tous les contenus
            </p>
            <ClickTracker elementId={`add-to-cart-bottom-${course.slug}`}>
              <Button variant="secondary" size="lg" onClick={handleAddToCart}>
                Ajouter au panier - {course.price.toFixed(2)} €
              </Button>
            </ClickTracker>
          </div>
        )}
      </div>
    </div>
  );
}
