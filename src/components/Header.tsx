import { Link, useLocation } from 'react-router-dom';
import { Home, Users as UsersIcon } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isUsers = location.pathname.startsWith('/users');

  return (
    <header className="bg-transparent text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-end">
        <nav className="flex items-center gap-10 text-sm">
          <Link
            to="/"
            className={`flex items-center gap-2 transition ${
              isHome ? 'font-bold underline' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <Home className="w-5 h-5 text-red-600" />
            <span>Home</span>
          </Link>

          <Link
            to="/users"
            className={`flex items-center gap-2 transition ${
              isUsers ? 'font-bold underline' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <UsersIcon className="w-5 h-5 text-red-600" />
            <span>Users</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
