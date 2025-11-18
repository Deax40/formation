'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export function CategoryCard({ title, description, icon, slug }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 border border-neutral-100"
    >
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed mb-6">{description}</p>
      <Link
        href={`/formations?category=${slug}`}
        className="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors group"
      >
        Voir les formations
        <svg
          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </motion.div>
  );
}
