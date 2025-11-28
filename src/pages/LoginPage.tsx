import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { login } from '@/admin/auth';

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

    // Credenciales hardcodeadas para demo
    const validCredentials = [
      { email: 'admin@electoral.gov', password: 'Pipe123' },
      { email: 'admin@grupo3.com', password: 'Pipe123' }
    ];

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    );

    if (isValid) {
      // Login exitoso
      const userData = { correo: email, rol: 'admin' };
      localStorage.setItem('admin_user', JSON.stringify(userData));
      login({ email: email });
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    }

    setIsLoading(false);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-lg font-bold">Panel Administrativo</h1>
            <p className="text-gray-600 text-sm">Sistema Electoral Nacional</p>
          </div>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
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
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200">
            
            {/* Header Simple */}
            <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Acceso Seguro</h2>
              <p className="text-gray-700 text-sm">Credenciales administrativas requeridas</p>
            </div>

            {/* Formulario */}
            <div className="px-8 py-6 bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                        text-gray-900 placeholder-gray-500"
                      placeholder="admin@electoral.gov"
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                        text-gray-900 placeholder-gray-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Botón de Acceso */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-700 hover:via-red-600 hover:to-rose-700 
                    text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verificando...' : 'Acceder al Panel'}
                </button>
              </form>

              {/* Credenciales de Demo */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Credenciales de Demo:</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <code className="text-red-600 font-medium">admin@electoral.gov</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Password:</span>
                    <code className="text-red-600 font-medium">Pipe123</code>
                  </div>
                </div>
              </div>

              {/* Aviso de Seguridad */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600">
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
