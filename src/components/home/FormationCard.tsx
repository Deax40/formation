'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FormationCardProps {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  students?: number;
  rating?: number;
}

export function FormationCard({
  slug,
  title,
  subtitle,
  category,
  level,
  duration,
  price,
  students,
  rating,
}: FormationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-neutral-100 group"
    >
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {category === 'Entrepreneuriat' && '🚀'}
            {category === 'Codage' && '💻'}
            {category === 'Gestion' && '📊'}
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          <span>•</span>
          <span>{level}</span>
        </div>

        <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{subtitle}</p>

        {(students || rating) && (
          <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
            {students && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {students} étudiants
              </span>
            )}
            {rating && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {rating}/5
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            <span className="text-2xl font-bold text-primary">{price}€</span>
          </div>
          <Link
            href={`/formations/${slug}`}
            className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transform group-hover:scale-105 transition-all duration-200"
          >
            Découvrir
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
