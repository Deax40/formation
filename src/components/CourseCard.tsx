'use client';

import Link from 'next/link';
import { Button } from './Button';
import { ClickTracker } from './ClickTracker';

interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  duration: string;
  onAddToCart?: () => void;
  isPurchased?: boolean;
}

export function CourseCard({
  id,
  slug,
  title,
  description,
  price,
  category,
  level,
  duration,
  onAddToCart,
  isPurchased = false,
}: CourseCardProps) {
  const categoryColors: Record<string, string> = {
    'Codage': 'bg-blue-500',
    'Entrepreneuriat': 'bg-green-500',
    'Automatisation & IA': 'bg-purple-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`${categoryColors[category] || 'bg-gray-500'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {category}
          </span>
          <span className="text-gray-600 text-sm">{level}</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>⏱️ {duration}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-gray-900">{price.toFixed(2)} €</span>
          </div>

          <div className="flex flex-col gap-2">
            <ClickTracker elementId={`view-course-${slug}`}>
              <Link href={`/formations/${slug}`} className="block">
                <Button variant="outline" fullWidth>
                  Voir la formation
                </Button>
              </Link>
            </ClickTracker>

            {!isPurchased && onAddToCart && (
              <ClickTracker elementId={`add-to-cart-${slug}`}>
                <Button variant="primary" fullWidth onClick={onAddToCart}>
                  Ajouter au panier
                </Button>
              </ClickTracker>
            )}

            {isPurchased && (
              <div className="text-center py-2 text-green-600 font-semibold">
                ✓ Formation achetée
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
