'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FormationCard } from '@/components/home/FormationCard';
import { mockFormations, categories } from '@/data/mock-data';

export default function FormationsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredFormations = selectedCategory === 'all'
    ? mockFormations
    : mockFormations.filter(f => f.categorySlug === selectedCategory);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Toutes nos formations
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Parcourez notre catalogue complet et trouvez la formation qui vous correspond
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary'
                }`}
              >
                Toutes
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary'
                  }`}
                >
                  {category.icon} {category.title}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 focus:outline-none focus:border-primary"
            >
              <option value="popular">Plus populaires</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="recent">Plus récentes</option>
            </select>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <FormationCard {...formation} />
            </motion.div>
          ))}
        </div>

        {filteredFormations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              Aucune formation trouvée
            </h3>
            <p className="text-neutral-600">
              Essayez avec un autre filtre
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
