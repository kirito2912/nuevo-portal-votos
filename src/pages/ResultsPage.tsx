import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function ResultsPage() {
  const stats = [
    { label: 'Votos Totales', value: '1,234,567', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Participación', value: '68.5%', icon: TrendingUp, color: 'bg-blue-600' },
    { label: 'Votantes Registrados', value: '1,800,000', icon: Users, color: 'bg-purple-600' },
  ];

  const chartData = [
    { party: 'Partido Progresista', votes: 450000 },
    { party: 'Alianza Nacional', votes: 380000 },
    { party: 'Movimiento Verde', votes: 320000 },
    { party: 'Otros', votes: 84567 },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Resultados Electorales</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-dark-card rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Votos por Partido Político</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="party" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="votes" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
