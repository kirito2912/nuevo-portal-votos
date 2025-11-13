import { useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <header className="bg-dark-card border-b border-gray-700 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="text-blue-400" size={28} />
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
}
