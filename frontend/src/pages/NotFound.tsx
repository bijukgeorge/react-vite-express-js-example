import { Link } from 'react-router-dom';
import { AppRoutes } from '@/AppRoutes.ts';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-300 mb-8 max-w-md">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>
        <Link
          to={AppRoutes.Home}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
