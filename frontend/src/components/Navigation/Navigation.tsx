import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from '@/components/Navigation/NavigationItem.tsx';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-white font-bold text-xl hover:text-blue-400 transition-colors"
            >
              React App
            </Link>
            <div className="flex space-x-4">
              <NavigationItem
                path={'/'}
                name="Home"
                isActive={isActive('/')}
              ></NavigationItem>
              <NavigationItem
                path={'/about'}
                name="About"
                isActive={isActive('/about')}
              ></NavigationItem>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
