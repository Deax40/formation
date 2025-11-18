import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Gérer l'événement
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;

    if (!orderId || !userId) {
      console.error('Missing metadata in session');
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    try {
      // Mettre à jour le statut de la commande
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'paid' },
      });

      // Récupérer les formations de la commande
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId },
      });

      // Associer les formations à l'utilisateur
      await Promise.all(
        orderItems.map(item =>
          prisma.userCourse.create({
            data: {
              userId,
              courseId: item.courseId,
            },
          })
        )
      );

      // Vider le panier
      await prisma.cartItem.deleteMany({
        where: { userId },
      });

      console.log(`Order ${orderId} completed successfully`);
    } catch (error) {
      console.error('Error processing order:', error);
      return NextResponse.json(
        { error: 'Error processing order' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
