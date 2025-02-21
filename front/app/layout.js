'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, AuthProvider } from './context/AuthContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}

function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-blue-900 to-blue-300 shadow-2xl text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-3xl font-titles">Ficticia S.A.</h1>
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-70 shadow-md text-white font-bold font-header text-2xl tracking-wider py-2 px-4 rounded"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-700 shadow-md text-white font-bold font-header text-2xl tracking-wider py-2 px-4 rounded"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col md:flex-row">
          <nav className="bg-gradient-to-b from-gray-800 to-gray-500 shadow-2xl text-white w-full md:w-64 min-h-full">
            <ul className="p-4">
              <li className="mb-4">
                {isAuthenticated ? (
                  <Link href="/dashboard" className="text-lg font-body">
                    Dashboard
                  </Link>
                ) : (
                  <span className="text-lg text-gray-500 cursor-not-allowed font-body">
                    Dashboard
                  </span>
                )}
              </li>
              <li className="mb-4">
                {isAuthenticated ? (
                  <Link href="/clients" className="text-lg font-body">
                    Clientes
                  </Link>
                ) : (
                  <span className="text-lg text-gray-500 cursor-not-allowed font-body">
                    Clientes
                  </span>
                )}
              </li>
              {/* Agrega más enlaces según sea necesario */}
            </ul>
          </nav>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center font-body">
            &copy; 2025 Ficticia S.A. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}