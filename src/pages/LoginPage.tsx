import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { login } from '@/admin/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@grupo3.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: email,
          contrasena: password
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const message = data.detail || `Error ${response.status}: ${response.statusText}`;
        setError(message);
        setIsLoading(false);
        return;
      }

      // Si el backend responde OK, guardamos el usuario y navegamos
      const data = await response.json();
      // Guardar en ambas claves para compatibilidad
      localStorage.setItem('admin_user', JSON.stringify(data));
      login({ email: data.correo });
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Error en login:', err);
      if (err.message && err.message.includes('Failed to fetch')) {
        setError('No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo en http://localhost:8000');
      } else {
        setError(`Error de conexión: ${err.message || 'Error desconocido'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg font-bold">Panel Administrativo</h1>
            <p className="text-gray-400 text-sm">Sistema Electoral Nacional</p>
          </div>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={18} />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Tarjeta Principal */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            
            {/* Header Simple */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-white mb-1">Acceso Seguro</h2>
              <p className="text-blue-100 text-sm">Credenciales administrativas requeridas</p>
            </div>

            {/* Formulario */}
            <div className="px-8 py-6 bg-gray-800 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-white placeholder-gray-400"
                      placeholder="admin@electoral.gov"
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Botón de Acceso */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                    text-white py-3 rounded-lg font-semibold transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verificando...' : 'Acceder al Panel'}
                </button>
              </form>

              {/* Credenciales de Demo */}
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-200 mb-2">Credenciales de Demo:</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <code className="text-blue-300">admin@electoral.gov</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Password:</span>
                    <code className="text-blue-300">Pipe123</code>
                  </div>
                </div>
              </div>

              {/* Aviso de Seguridad */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Acceso Restringido • Solo Personal Autorizado
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Todas las actividades son monitoreadas y registradas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
