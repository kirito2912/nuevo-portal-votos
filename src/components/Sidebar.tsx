import { Link, useLocation } from 'react-router-dom';
import { Home, Vote, BarChart3, Info, Shield } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/votar', label: 'Votar', icon: Vote },
    { to: '/resultados', label: 'Resultados', icon: BarChart3 },
    { to: '/acerca-de', label: 'Acerca de', icon: Info },
    { to: '/admin/login', label: 'Admin', icon: Shield },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-card border-r border-gray-700">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400">Sistema Electoral</h1>
        <p className="text-sm text-gray-400 mt-1">Nacional</p>
      </div>

      <nav className="mt-6">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                  : 'text-gray-300 hover:bg-dark-hover'
              }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
