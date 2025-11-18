import { prisma } from '@/lib/prisma';

async function getAdminStats() {
  const [
    totalUsers,
    totalOrders,
    paidOrders,
    totalCoursesSold,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.findMany({
      where: { paymentStatus: 'paid' },
      select: { totalAmount: true },
    }),
    prisma.userCourse.count(),
  ]);

  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  return {
    totalUsers,
    totalOrders,
    paidOrdersCount: paidOrders.length,
    totalRevenue,
    averageOrderValue,
    totalCoursesSold,
  };
}

async function getRecentOrders() {
  return await prisma.order.findMany({
    where: { paymentStatus: 'paid' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      orderItems: {
        include: {
          course: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const recentOrders = await getRecentOrders();

  return (
    <div className="container mx-auto px-4 pb-12">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Utilisateurs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Commandes payées</p>
              <p className="text-3xl font-bold text-gray-900">{stats.paidOrdersCount}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Chiffre d'affaires</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toFixed(2)} €</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Panier moyen</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageOrderValue.toFixed(2)} €</p>
            </div>
            <div className="text-4xl">🛒</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Formations vendues</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCoursesSold}</p>
            </div>
            <div className="text-4xl">📚</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Total commandes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Commandes récentes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Commandes récentes</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Aucune commande pour le moment</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Client</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Formations</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Montant</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900 font-medium">{order.user.name}</div>
                      <div className="text-gray-600 text-sm">{order.user.email}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {order.orderItems.map((item, idx) => (
                        <div key={item.id} className="text-sm">
                          {idx > 0 && ', '}
                          {item.course.title}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      {order.totalAmount.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
