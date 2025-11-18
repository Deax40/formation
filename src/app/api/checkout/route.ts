import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    // Récupérer le panier
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        course: true,
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Votre panier est vide' },
        { status: 400 }
      );
    }

    // Calculer le total
    const totalAmount = cartItems.reduce((sum, item) => sum + item.course.price, 0);

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        paymentStatus: 'pending',
        orderItems: {
          create: cartItems.map(item => ({
            courseId: item.course.id,
            priceAtPurchase: item.course.price,
          })),
        },
      },
    });

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.course.title,
            description: item.course.description,
          },
          unit_amount: Math.round(item.course.price * 100), // Convertir en centimes
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
      customer_email: user.email,
      metadata: {
        orderId: order.id,
        userId: user.id,
      },
    });

    // Mettre à jour la commande avec l'ID de session Stripe
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Erreur lors de la création de la session:', error);
    if (error.message === 'Non authentifié') {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}
