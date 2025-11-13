import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Shield } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de login
    if (email && password) {
      navigate('/admin/dashboard');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-lg font-medium">Panel Administrativo - Acceso Seguro</h1>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Regresar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Panel Administrativo</h2>
              <p className="text-cyan-100">Ingrese sus credenciales de acceso seguro</p>
            </div>

            {/* Form */}
            <div className="px-8 py-8 bg-gray-50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                      text-gray-900 placeholder-gray-400"
                      placeholder="admin@electoral.gov"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                      text-gray-900 placeholder-gray-400"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Acceder al Panel
                </button>
              </form>

              {/* Credentials Info */}
              <div className="mt-6 p-4 bg-cyan-50 border-l-4 border-cyan-400 rounded-r-lg">
                <h4 className="text-sm font-semibold text-cyan-700 mb-2">Credenciales de Acceso:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Email:</span> admin@electoral.gov</p>
                  <p><span className="font-medium">Password:</span> Admin2025!</p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 flex items-start gap-3 text-xs text-gray-500">
                <Shield className="text-cyan-500 mt-0.5 flex-shrink-0" size={16} />
                <p>
                  Acceso restringido • Solo personal autorizado • Conexión segura y encriptada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}