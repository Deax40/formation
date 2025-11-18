import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/Button';

async function getUserData(userId: string) {
  const [userCourses, orders] = await Promise.all([
    prisma.userCourse.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.order.findMany({
      where: {
        userId,
        paymentStatus: 'paid',
      },
      include: {
        orderItems: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  return { userCourses, orders };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  const { userCourses, orders } = await getUserData(user.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bonjour, {user.name} 👋
          </h1>
          <p className="text-gray-300">Bienvenue sur votre tableau de bord</p>
        </div>

        {/* Mes formations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Mes formations</h2>

          {userCourses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Aucune formation pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Découvrez notre catalogue et commencez votre apprentissage dès maintenant
              </p>
              <Link href="/formations">
                <Button variant="primary">Voir les formations</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCourses.map(({ course }) => (
                <Link
                  key={course.id}
                  href={`/formations/${course.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-sm text-primary font-semibold mb-2">
                      {course.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{course.level}</span>
                      <span className="text-gray-500">⏱️ {course.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Historique des commandes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Historique des commandes</h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Aucune commande pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Commande du {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order.orderItems.length} formation
                        {order.orderItems.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {order.totalAmount.toFixed(2)} €
                      </div>
                      <div className="text-sm text-green-600 font-semibold">
                        ✓ Payée
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Formations incluses :
                    </h4>
                    <ul className="space-y-1">
                      {order.orderItems.map((item) => (
                        <li key={item.id} className="text-sm text-gray-600 flex items-center justify-between">
                          <span>• {item.course.title}</span>
                          <span className="font-semibold">{item.priceAtPurchase.toFixed(2)} €</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
