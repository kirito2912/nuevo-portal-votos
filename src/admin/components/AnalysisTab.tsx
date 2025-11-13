import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, TrendingUp } from 'lucide-react';

export default function AnalysisTab() {
  const stats = [
    { label: 'Votantes Activos', value: '45,234', icon: Users, color: 'bg-blue-600' },
    { label: 'Tasa de Participación', value: '68.5%', icon: TrendingUp, color: 'bg-green-600' },
    { label: 'Pico de Actividad', value: '14:30', icon: Activity, color: 'bg-purple-600' },
  ];

  const flowData = [
    { hour: '08:00', votes: 1200 },
    { hour: '09:00', votes: 3400 },
    { hour: '10:00', votes: 5600 },
    { hour: '11:00', votes: 7800 },
    { hour: '12:00', votes: 9200 },
    { hour: '13:00', votes: 8500 },
    { hour: '14:00', votes: 11000 },
    { hour: '15:00', votes: 9800 },
    { hour: '16:00', votes: 7600 },
    { hour: '17:00', votes: 5400 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-dark-card rounded-lg p-6 border border-gray-700">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-6">Flujo de Votación por Hora</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={flowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="votes" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
