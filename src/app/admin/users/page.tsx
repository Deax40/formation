import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getUsers() {
  return await prisma.user.findMany({
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
      orders: {
        where: {
          paymentStatus: 'paid',
        },
        select: {
          totalAmount: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  const usersWithStats = users.map(user => ({
    ...user,
    totalSpent: user.orders.reduce((sum, order) => sum + order.totalAmount, 0),
  }));

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Utilisateurs ({users.length})
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Aucun utilisateur</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Nom</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Rôle</th>
                  <th className="text-center py-3 px-4 text-gray-700 font-semibold">Commandes</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Total dépensé</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Inscription</th>
                </tr>
              </thead>
              <tbody>
                {usersWithStats.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-900">
                      {user._count.orders}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      {user.totalSpent.toFixed(2)} €
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
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
