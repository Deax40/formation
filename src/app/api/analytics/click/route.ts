import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, elementId } = body;

    if (!path || !elementId) {
      return NextResponse.json(
        { error: 'path et elementId sont requis' },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    await prisma.clickEvent.create({
      data: {
        path,
        elementId,
        userId: user?.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du clic:', error);
    // Ne pas renvoyer d'erreur - l'analytics ne doit pas casser l'UX
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
