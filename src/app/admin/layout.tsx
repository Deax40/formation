import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?callbackUrl=/admin');
  }

  if (user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen">
      <div className="bg-dark-light border-b border-gray-800 mb-8">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white mb-4">Administration</h1>
          <nav className="flex flex-wrap gap-4">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Utilisateurs
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Commandes
            </Link>
            <Link
              href="/admin/analytics"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Analytics
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
