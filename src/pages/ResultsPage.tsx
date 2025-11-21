import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  Users,
  TrendingUp,
  CheckCircle,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

type CandidateTrend = 'up' | 'down' | 'steady';

type CandidateResultRow = {
  id: number;
  name: string;
  party: string;
  coalition: string;
  votes: number;
  voteShare: number;
  trend: CandidateTrend;
  change: number;
};

type TabId = 'presidencial' | 'regional' | 'distrital';

type ResultsView = {
  totalVotes: number;
  candidateCount: number;
  participation: number;
  description: string;
  chart: Array<{ name: string; votes: number; participation: number }>;
  topCandidates: CandidateResultRow[];
};

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'presidencial', label: 'Presidencial' },
  { id: 'regional', label: 'Regional' },
  { id: 'distrital', label: 'Distrital' },
];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('presidencial');

  const resultsData: Record<TabId, ResultsView> = useMemo(
    () => ({
      presidencial: {
        totalVotes: 6750,
        candidateCount: 10,
        participation: 98.5,
        description: 'Conteo nacional para la elección presidencial',
        chart: [
          { name: 'Keiko Fujimori', votes: 1250, participation: 42 },
          { name: 'Rafael López Aliaga', votes: 1120, participation: 38 },
          { name: 'Verónika Mendoza', votes: 980, participation: 35 },
          { name: 'Hernando de Soto', votes: 920, participation: 33 },
          { name: 'Cesar Acuña', votes: 890, participation: 32 },
        ],
        topCandidates: [
          {
            id: 1,
            name: 'Keiko Fujimori',
            party: 'Fuerza Popular',
            coalition: 'Alianza Ciudadana',
            votes: 1250,
            voteShare: 18.5,
            trend: 'up',
            change: 1.2,
          },
          {
            id: 2,
            name: 'Rafael López Aliaga',
            party: 'Renovación Popular',
            coalition: 'Coalición Desarrollo',
            votes: 1120,
            voteShare: 16.6,
            trend: 'steady',
            change: 0.1,
          },
          {
            id: 3,
            name: 'Verónika Mendoza',
            party: 'Nuevo Perú',
            coalition: 'Bloque Progresista',
            votes: 980,
            voteShare: 14.5,
            trend: 'up',
            change: 0.9,
          },
          {
            id: 4,
            name: 'Hernando de Soto',
            party: 'Avanza País',
            coalition: 'Coalición Liberal',
            votes: 920,
            voteShare: 13.6,
            trend: 'up',
            change: 0.7,
          },
          {
            id: 5,
            name: 'Cesar Acuña',
            party: 'Alianza para el Progreso',
            coalition: 'Bloque Progresista',
            votes: 890,
            voteShare: 13.2,
            trend: 'steady',
            change: 0.2,
          },
        ],
      },
      regional: {
        totalVotes: 1280,
        candidateCount: 3,
        participation: 96.2,
        description: 'Resultados acumulados por regiones administrativas',
        chart: [
          { name: 'Ana María Torres', votes: 512, participation: 52 },
          { name: 'Miguel Ángel Castro', votes: 465, participation: 48 },
          { name: 'Laura Mendoza', votes: 303, participation: 31 },
        ],
        topCandidates: [
          {
            id: 11,
            name: 'Ana María Torres',
            party: 'Fuerza Regional',
            coalition: 'Coalición Regional',
            votes: 512,
            voteShare: 40.0,
            trend: 'up',
            change: 1.7,
          },
          {
            id: 12,
            name: 'Miguel Ángel Castro',
            party: 'Alianza Regional',
            coalition: 'Movimiento Regional',
            votes: 465,
            voteShare: 36.3,
            trend: 'steady',
            change: 0.0,
          },
          {
            id: 13,
            name: 'Laura Mendoza',
            party: 'Unión Regional',
            coalition: 'Frente Social',
            votes: 303,
            voteShare: 23.7,
            trend: 'up',
            change: 0.5,
          },
        ],
      },
      distrital: {
        totalVotes: 590,
        candidateCount: 3,
        participation: 94.8,
        description: 'Detalle por distritos con consolidación en tiempo real',
        chart: [
          { name: 'Carlos Rojas', votes: 226, participation: 51 },
          { name: 'Patricia Silva', votes: 218, participation: 49 },
          { name: 'Javier Quispe', votes: 146, participation: 33 },
        ],
        topCandidates: [
          {
            id: 14,
            name: 'Carlos Rojas',
            party: 'Fuerza Distrital',
            coalition: 'Alianza Distrital',
            votes: 226,
            voteShare: 38.3,
            trend: 'up',
            change: 1.1,
          },
          {
            id: 15,
            name: 'Patricia Silva',
            party: 'Alianza Distrital',
            coalition: 'Frente Local',
            votes: 218,
            voteShare: 36.9,
            trend: 'steady',
            change: 0.2,
          },
          {
            id: 16,
            name: 'Javier Quispe',
            party: 'Unión Distrital',
            coalition: 'Movimiento Comunitario',
            votes: 146,
            voteShare: 24.8,
            trend: 'up',
            change: 0.8,
          },
        ],
      },
    }),
    []
  );

  const activeData = resultsData[activeTab];

  const stats = [
    {
      label: 'Votos Totales',
      value: formatNumber(activeData.totalVotes),
      icon: CheckCircle,
      iconBg: 'bg-blue-500/20 text-blue-300',
      description: activeData.description,
    },
    {
      label: 'Candidatos',
      value: activeData.candidateCount.toString(),
      icon: Users,
      iconBg: 'bg-purple-500/20 text-purple-300',
      description: 'Número de postulantes en esta categoría',
    },
    {
      label: 'Participación',
      value: `${activeData.participation.toFixed(1)}%`,
      icon: TrendingUp,
      iconBg: 'bg-emerald-500/20 text-emerald-300',
      description: 'Porcentaje de participación ciudadana',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-blue-400/80">
          <Target size={14} className="sm:w-4 sm:h-4" />
          Monitoreo Electoral
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Resultados Electorales</h1>
        <p className="text-sm sm:text-base text-gray-400">
          Conteo en tiempo real de votos registrados. Selecciona una categoría para explorar métricas
          detalladas y comparar el desempeño entre agrupaciones.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-dark-card/60 p-1.5 sm:p-2 backdrop-blur border border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-dark-card/80 p-6 transition-colors duration-300 hover:border-blue-500/40"
            >
              <div
                className={`mb-4 inline-flex items-center justify-center rounded-xl p-3 text-xl ${stat.iconBg}`}
              >
                <Icon size={22} />
              </div>
              <p className="text-sm uppercase tracking-wide text-gray-400">{stat.label}</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{stat.value}</h3>
              <p className="mt-3 text-sm text-gray-400">{stat.description}</p>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-gray-800 bg-dark-card/80 p-6">
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Votos totales por agrupación política</h2>
            <p className="text-sm text-gray-400">
              Comparativa de votos y porcentaje de participación para cada agrupación dentro de la vista seleccionada.
            </p>
          </div>
          <span className="rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-300">
            Vista: {tabs.find((tab) => tab.id === activeTab)?.label}
          </span>
        </header>

        <div className="h-[300px] sm:h-[350px] md:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={activeData.chart} margin={{ top: 20, right: 20, bottom: 12, left: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={{ stroke: '#374151' }} />
              <YAxis
                yAxisId="left"
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                tickFormatter={(value) => formatNumber(value)}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '0.75rem' }}
                labelStyle={{ color: '#E5E7EB', fontWeight: 600 }}
                formatter={(value, name) => {
                  if (name === 'participation') {
                    return [`${value}%`, 'Participación'];
                  }
                  return [formatNumber(Number(value)), 'Votos'];
                }}
              />
              <Bar yAxisId="left" dataKey="votes" radius={[12, 12, 0, 0]} barSize={56} fill="url(#barGradient)" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="participation"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: '#f97316', fill: '#111827' }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-800 bg-dark-card/80 p-6">
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Detalle de candidatos destacados</h2>
            <p className="text-sm text-gray-400">
              Listado de los principales candidatos con sus resultados actualizados. Se muestran como máximo 5 por vista.
            </p>
          </div>
          <span className="rounded-full bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-200">
            Última actualización: hace 3 minutos
          </span>
        </header>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-800 text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="pb-3 pr-6">Candidato</th>
                <th className="pb-3 pr-6">Partido / Alianza</th>
                <th className="pb-3 pr-6">Votos</th>
                <th className="pb-3 pr-6">% Votos</th>
                <th className="pb-3 pr-6">Tendencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {activeData.topCandidates.slice(0, 5).map((candidate) => {
                const initials = getInitials(candidate.name);
                const TrendIcon =
                  candidate.trend === 'up' ? ArrowUpRight : candidate.trend === 'down' ? ArrowDownRight : Minus;
                const trendClasses =
                  candidate.trend === 'up'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : candidate.trend === 'down'
                    ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                    : 'bg-gray-600/10 text-gray-400 border border-gray-600/20';

                return (
                  <tr key={candidate.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-300">
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-white">{candidate.name}</p>
                          <p className="text-xs text-gray-400">{candidate.coalition}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="rounded-full bg-gray-700/40 px-3 py-1 text-xs text-gray-200">
                        {candidate.party}
                      </span>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="font-semibold text-white">{formatNumber(candidate.votes)}</span>
                    </td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 rounded-full bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${Math.min(candidate.voteShare, 100)}%` }}
                          />
                        </div>
                        <span className="w-16 text-right font-medium">{candidate.voteShare.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${trendClasses}`}>
                        <TrendIcon size={14} />
                        {formatChange(candidate.change)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-PE').format(value);
}

function formatChange(change: number): string {
  if (change === 0) {
    return '0.0 pts';
  }
  return `${change > 0 ? '+' : ''}${change.toFixed(1)} pts`;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
