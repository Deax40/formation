import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';

// GET - Récupérer le panier
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            price: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json({ items: cartItems });
  } catch (error: any) {
    if (error.message === 'Non authentifié') {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    console.error('Erreur lors de la récupération du panier:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du panier' },
      { status: 500 }
    );
  }
}

// POST - Ajouter au panier
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: 'ID de formation requis' },
        { status: 400 }
      );
    }

    // Vérifier si la formation existe
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà acheté cette formation
    const existingPurchase = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'Vous avez déjà acheté cette formation' },
        { status: 400 }
      );
    }

    // Vérifier si la formation est déjà dans le panier
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (existingCartItem) {
      return NextResponse.json(
        { error: 'Formation déjà dans le panier' },
        { status: 400 }
      );
    }

    // Ajouter au panier
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: user.id,
        courseId,
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json({ cartItem }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Non authentifié') {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    console.error('Erreur lors de l\'ajout au panier:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout au panier' },
      { status: 500 }
    );
  }
}

// DELETE - Retirer du panier
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: 'ID de formation requis' },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Non authentifié') {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    console.error('Erreur lors de la suppression du panier:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du panier' },
      { status: 500 }
    );
  }
}
