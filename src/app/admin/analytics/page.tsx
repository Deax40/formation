import { prisma } from '@/lib/prisma';

async function getClickAnalytics() {
  const clickEvents = await prisma.clickEvent.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  // Analyser les clics par path
  const clicksByPath: Record<string, number> = {};
  clickEvents.forEach(event => {
    clicksByPath[event.path] = (clicksByPath[event.path] || 0) + 1;
  });

  // Analyser les clics par elementId
  const clicksByElement: Record<string, number> = {};
  clickEvents.forEach(event => {
    clicksByElement[event.elementId] = (clicksByElement[event.elementId] || 0) + 1;
  });

  // Trier par nombre de clics décroissant
  const sortedPaths = Object.entries(clicksByPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const sortedElements = Object.entries(clicksByElement)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return {
    totalClicks: clickEvents.length,
    clicksByPath: sortedPaths,
    clicksByElement: sortedElements,
    recentClicks: clickEvents.slice(0, 20),
  };
}

export default async function AdminAnalyticsPage() {
  const analytics = await getClickAnalytics();

  return (
    <div className="container mx-auto px-4 pb-12">
      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Total des clics</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalClicks}</p>
            </div>
            <div className="text-4xl">👆</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Pages trackées</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.clicksByPath.length}</p>
            </div>
            <div className="text-4xl">📄</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Éléments trackés</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.clicksByElement.length}</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Clics par page */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Clics par page</h2>

          {analytics.clicksByPath.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Aucune donnée</p>
          ) : (
            <div className="space-y-3">
              {analytics.clicksByPath.map(([path, count]) => (
                <div key={path} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">{path}</div>
                    <div className="bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{
                          width: `${(count / analytics.clicksByPath[0][1]) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-xl font-bold text-gray-900">{count}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clics par élément */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top éléments cliqués</h2>

          {analytics.clicksByElement.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Aucune donnée</p>
          ) : (
            <div className="space-y-3">
              {analytics.clicksByElement.map(([elementId, count]) => (
                <div key={elementId} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium text-sm">{elementId}</div>
                    <div className="bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{
                          width: `${(count / analytics.clicksByElement[0][1]) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-xl font-bold text-gray-900">{count}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clics récents */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Clics récents</h2>

        {analytics.recentClicks.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Aucun clic enregistré</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Page</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Élément</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentClicks.map((click) => (
                  <tr key={click.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700 text-sm">
                      {new Date(click.createdAt).toLocaleString('fr-FR')}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{click.path}</td>
                    <td className="py-3 px-4 text-gray-700 text-sm font-mono">
                      {click.elementId}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        click.userId
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {click.userId ? 'Utilisateur' : 'Anonyme'}
                      </span>
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
