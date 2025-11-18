import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Si l'utilisateur est connecté, récupérer ses formations achetées
    const user = await getCurrentUser();
    let purchasedCourseIds: string[] = [];

    if (user) {
      const userCourses = await prisma.userCourse.findMany({
        where: {
          userId: user.id,
        },
        select: {
          courseId: true,
        },
      });
      purchasedCourseIds = userCourses.map(uc => uc.courseId);
    }

    return NextResponse.json({
      courses,
      purchasedCourseIds,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des formations' },
      { status: 500 }
    );
  }
}
