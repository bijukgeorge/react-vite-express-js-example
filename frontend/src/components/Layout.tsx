import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
