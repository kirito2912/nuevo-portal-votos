import { TrendingUp, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResultsTab() {
  const stats = [
    { label: 'Total de Votos', value: '1,234,567', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Participación', value: '68.5%', icon: TrendingUp, color: 'bg-blue-600' },
    { label: 'Votantes Registrados', value: '1,800,000', icon: Users, color: 'bg-purple-600' },
    { label: 'Votos Pendientes', value: '245', icon: AlertCircle, color: 'bg-yellow-600' },
  ];

  const candidates = [
    { name: 'María González', party: 'Partido Progresista', votes: 450000, percentage: 36.5 },
    { name: 'Carlos Rodríguez', party: 'Alianza Nacional', votes: 380000, percentage: 30.8 },
    { name: 'Ana Martínez', party: 'Movimiento Verde', votes: 320000, percentage: 25.9 },
    { name: 'Otros', party: 'Varios', votes: 84567, percentage: 6.8 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        <h3 className="text-xl font-semibold mb-6">Resultados por Candidato</h3>
        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <div key={index} className="border-b border-gray-700 pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{candidate.name}</p>
                  <p className="text-sm text-gray-400">{candidate.party}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{candidate.votes.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">{candidate.percentage}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${candidate.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
