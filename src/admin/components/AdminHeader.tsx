import { useNavigate } from 'react-router-dom';
import { CheckSquare2, CheckCircle2, ArrowRight } from 'lucide-react';
import { logout } from '@/admin/auth';
import '../../styles/admin/index.css';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="admin-header-left">
          <CheckSquare2 className="text-blue-400" size={28} />
          <div>
            <h1 className="admin-header-title">Panel de Administración</h1>
            <p className="admin-header-subtitle">Sistema Electoral Digital</p>
          </div>
        </div>

        <div className="admin-header-right">
          <div className="admin-user-info">
            <span className="admin-user-email">admin@electoral.gov</span>
            <span className="admin-user-role">Administrador</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            <span>Cerrar Sesión</span>
            <ArrowRight size={18} />
          </button>

          <div className="admin-status-badge">
            <CheckCircle2 size={16} />
            <span>Estado del Sistema Operativo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
