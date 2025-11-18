import { prisma } from '@/lib/prisma';

async function getOrders() {
  return await prisma.order.findMany({
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
  });
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Commandes ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Aucune commande</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Commande #{order.id.substring(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {order.totalAmount.toFixed(2)} €
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : order.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.paymentStatus === 'paid' ? 'Payée' :
                       order.paymentStatus === 'pending' ? 'En attente' :
                       'Échouée'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Client</h4>
                      <p className="text-gray-900 font-medium">{order.user.name}</p>
                      <p className="text-gray-600 text-sm">{order.user.email}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Formations ({order.orderItems.length})
                      </h4>
                      <ul className="space-y-1">
                        {order.orderItems.map((item) => (
                          <li key={item.id} className="text-sm">
                            <span className="text-gray-900">{item.course.title}</span>
                            <span className="text-gray-600"> - {item.priceAtPurchase.toFixed(2)} €</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {order.stripeSessionId && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Session Stripe: {order.stripeSessionId}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
