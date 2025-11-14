import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, BarChart3, Target, Award } from 'lucide-react';

export default function AnalysisTab() {
  const [stats, setStats] = useState([
    { label: 'Votantes Activos', value: '1,247', icon: Users, color: 'bg-blue-600' },
    { label: 'Tasa de Participación', value: '98.5%', icon: TrendingUp, color: 'bg-green-600' },
    { label: 'Pico de Actividad', value: '14:30', icon: Activity, color: 'bg-purple-600' },
  ]);

  const flowData = [
    { hour: '08:00', votes: 120, presidencial: 45, regional: 38, distrital: 37 },
    { hour: '09:00', votes: 340, presidencial: 128, regional: 112, distrital: 100 },
    { hour: '10:00', votes: 560, presidencial: 210, regional: 185, distrital: 165 },
    { hour: '11:00', votes: 780, presidencial: 292, regional: 256, distrital: 232 },
    { hour: '12:00', votes: 920, presidencial: 345, regional: 302, distrital: 273 },
    { hour: '13:00', votes: 850, presidencial: 319, regional: 279, distrital: 252 },
    { hour: '14:00', votes: 1100, presidencial: 412, regional: 361, distrital: 327 },
    { hour: '15:00', votes: 980, presidencial: 367, regional: 322, distrital: 291 },
    { hour: '16:00', votes: 760, presidencial: 285, regional: 250, distrital: 225 },
    { hour: '17:00', votes: 540, presidencial: 202, regional: 177, distrital: 161 },
  ];

  const candidateData = [
    { name: 'Keiko Fujimori', votes: 456, color: '#3b82f6' },
    { name: 'Rafael López Aliaga', votes: 399, color: '#10b981' },
    { name: 'César Acuña', votes: 392, color: '#f59e0b' },
  ];

  const categoryData = [
    { name: 'Presidencial', value: 1247, color: '#3b82f6' },
    { name: 'Regional', value: 1092, color: '#10b981' },
    { name: 'Distrital', value: 988, color: '#8b5cf6' },
  ];

  useEffect(() => {
    // Simular actualización de estadísticas
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 200) + 1100;
      setStats(prev => [
        { ...prev[0], value: newValue.toLocaleString() },
        { ...prev[1], value: `${(Math.random() * 5 + 95).toFixed(1)}%` },
        prev[2]
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-dark-card rounded-lg p-6 border border-gray-700">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flujo de Votación por Hora */}
        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="text-blue-400" size={24} />
            Flujo de Votación por Hora
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={flowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="votes" stroke="#3b82f6" strokeWidth={2} name="Total Votos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución por Categoría */}
        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="text-purple-400" size={24} />
            Distribución por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resultados por Candidato Presidencial */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Award className="text-yellow-400" size={24} />
          Resultados por Candidato Presidencial
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={candidateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
              {candidateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Votación por Categoría a lo Largo del Día */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Target className="text-green-400" size={24} />
          Votación por Categoría a lo Largo del Día
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={flowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="presidencial" stroke="#3b82f6" strokeWidth={2} name="Presidencial" />
            <Line type="monotone" dataKey="regional" stroke="#10b981" strokeWidth={2} name="Regional" />
            <Line type="monotone" dataKey="distrital" stroke="#8b5cf6" strokeWidth={2} name="Distrital" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
