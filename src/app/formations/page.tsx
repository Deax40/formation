'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CourseCard } from '@/components/CourseCard';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  category: string;
  level: string;
  duration: string;
}

export default function FormationsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, [session]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data.courses || []);
      setPurchasedCourseIds(data.purchasedCourseIds || []);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (courseId: string) => {
    if (!session) {
      router.push('/login?callbackUrl=/formations');
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        alert('Formation ajoutée au panier !');
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de l\'ajout au panier');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout au panier');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement des formations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos formations
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez notre catalogue de formations professionnelles pour développer vos compétences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              slug={course.slug}
              title={course.title}
              description={course.description}
              price={course.price}
              category={course.category}
              level={course.level}
              duration={course.duration}
              onAddToCart={() => handleAddToCart(course.id)}
              isPurchased={purchasedCourseIds.includes(course.id)}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucune formation disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
