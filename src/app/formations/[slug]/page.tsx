import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { CourseDetailClient } from './CourseDetailClient';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  return course;
}

async function checkIfPurchased(courseId: string, userId?: string) {
  if (!userId) return false;

  const userCourse = await prisma.userCourse.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  return !!userCourse;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const course = await getCourse(params.slug);

  if (!course) {
    notFound();
  }

  const user = await getCurrentUser();
  const isPurchased = await checkIfPurchased(course.id, user?.id);

  return (
    <CourseDetailClient course={course} isPurchased={isPurchased} />
  );
}

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    select: { slug: true },
  });

  return courses.map((course) => ({
    slug: course.slug,
  }));
}
