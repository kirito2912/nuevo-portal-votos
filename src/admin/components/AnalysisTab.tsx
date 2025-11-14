import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, BarChart3, Target, Award } from 'lucide-react';

type CategoryType = 'presidencial' | 'regional' | 'distrital';

interface AnalysisTabProps {
  selectedCategory: CategoryType;
}

export default function AnalysisTab({ selectedCategory }: AnalysisTabProps) {
  // Datos de candidatos presidenciales (10 candidatos)
  const presidentialCandidates = [
    { name: 'Keiko Fujimori', votes: 1250, color: '#3b82f6' },
    { name: 'Rafael López Aliaga', votes: 1120, color: '#10b981' },
    { name: 'Verónika Mendoza', votes: 980, color: '#f59e0b' },
    { name: 'Hernando de Soto', votes: 920, color: '#8b5cf6' },
    { name: 'Cesar Acuña', votes: 890, color: '#ec4899' },
    { name: 'López Chau', votes: 750, color: '#06b6d4' },
    { name: 'Carlos Espá', votes: 680, color: '#f97316' },
    { name: 'Carlos Álvarez', votes: 620, color: '#84cc16' },
    { name: 'Phillip Butters', votes: 340, color: '#6366f1' },
    { name: 'Wolfgang Grozo', votes: 200, color: '#14b8a6' },
  ];

  // Datos de candidatos regionales (3 candidatos)
  const regionalCandidates = [
    { name: 'Ana María Torres', votes: 512, color: '#3b82f6' },
    { name: 'Miguel Ángel Castro', votes: 465, color: '#10b981' },
    { name: 'Laura Mendoza', votes: 303, color: '#f59e0b' },
  ];

  // Datos de candidatos distritales (3 candidatos)
  const distritalCandidates = [
    { name: 'Carlos Rojas', votes: 226, color: '#3b82f6' },
    { name: 'Patricia Silva', votes: 218, color: '#10b981' },
    { name: 'Javier Quispe', votes: 146, color: '#f59e0b' },
  ];

  // Obtener datos según la categoría seleccionada
  const candidateData = useMemo(() => {
    switch (selectedCategory) {
      case 'presidencial':
        return presidentialCandidates;
      case 'regional':
        return regionalCandidates;
      case 'distrital':
        return distritalCandidates;
      default:
        return presidentialCandidates;
    }
  }, [selectedCategory]);

  // Datos de flujo por hora - TOTAL de todas las categorías
  const totalFlowData = useMemo(() => {
    const baseData = [
      { hour: '08:00', presidencial: 45, regional: 38, distrital: 37 },
      { hour: '09:00', presidencial: 128, regional: 112, distrital: 100 },
      { hour: '10:00', presidencial: 210, regional: 185, distrital: 165 },
      { hour: '11:00', presidencial: 292, regional: 256, distrital: 232 },
      { hour: '12:00', presidencial: 345, regional: 302, distrital: 273 },
      { hour: '13:00', presidencial: 319, regional: 279, distrital: 252 },
      { hour: '14:00', presidencial: 412, regional: 361, distrital: 327 },
      { hour: '15:00', presidencial: 367, regional: 322, distrital: 291 },
      { hour: '16:00', presidencial: 285, regional: 250, distrital: 225 },
      { hour: '17:00', presidencial: 202, regional: 177, distrital: 161 },
    ];

    // Sumar todas las categorías para el total
    return baseData.map(item => ({
      hour: item.hour,
      totalVotes: item.presidencial + item.regional + item.distrital,
      presidencial: item.presidencial,
      regional: item.regional,
      distrital: item.distrital,
    }));
  }, []);

  // Datos acumulados a lo largo del día (votos acumulados desde el inicio)
  const accumulatedData = useMemo(() => {
    const baseData = [
      { hour: '08:00', presidencial: 45, regional: 38, distrital: 37 },
      { hour: '09:00', presidencial: 128, regional: 112, distrital: 100 },
      { hour: '10:00', presidencial: 210, regional: 185, distrital: 165 },
      { hour: '11:00', presidencial: 292, regional: 256, distrital: 232 },
      { hour: '12:00', presidencial: 345, regional: 302, distrital: 273 },
      { hour: '13:00', presidencial: 319, regional: 279, distrital: 252 },
      { hour: '14:00', presidencial: 412, regional: 361, distrital: 327 },
      { hour: '15:00', presidencial: 367, regional: 322, distrital: 291 },
      { hour: '16:00', presidencial: 285, regional: 250, distrital: 225 },
      { hour: '17:00', presidencial: 202, regional: 177, distrital: 161 },
    ];

    let accumulated = 0;
    return baseData.map(item => {
      accumulated += item[selectedCategory];
      return {
        hour: item.hour,
        accumulatedVotes: accumulated,
      };
    });
  }, [selectedCategory]);

  // Estadísticas según categoría
  const getStats = () => {
    const totalVotes = candidateData.reduce((sum, c) => sum + c.votes, 0);
    const participation = selectedCategory === 'presidencial' ? 98.5 : selectedCategory === 'regional' ? 96.2 : 94.8;
    
    return [
      { label: 'Votantes Activos', value: totalVotes.toLocaleString(), icon: Users, color: 'bg-blue-600' },
      { label: 'Tasa de Participación', value: `${participation}%`, icon: TrendingUp, color: 'bg-green-600' },
      { label: 'Pico de Actividad', value: '14:30', icon: Activity, color: 'bg-purple-600' },
    ];
  };

  const [stats, setStats] = useState(getStats());

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'presidencial':
        return 'Presidencial';
      case 'regional':
        return 'Regional';
      case 'distrital':
        return 'Distrital';
      default:
        return 'Electoral';
    }
  };

  const getChartTitle = () => {
    switch (selectedCategory) {
      case 'presidencial':
        return 'Resultados por Candidato Presidencial';
      case 'regional':
        return 'Resultados por Candidato Regional';
      case 'distrital':
        return 'Resultados por Candidato Distrital';
      default:
        return 'Resultados por Candidato';
    }
  };

  useEffect(() => {
    // Actualizar estadísticas cuando cambia la categoría
    setStats(getStats());
    
    // Simular actualización de estadísticas
    const interval = setInterval(() => {
      const totalVotes = candidateData.reduce((sum, c) => sum + c.votes, 0);
      const newValue = totalVotes + Math.floor(Math.random() * 20) - 10;
      const participation = selectedCategory === 'presidencial' ? 98.5 : selectedCategory === 'regional' ? 96.2 : 94.8;
      
      setStats([
        { label: 'Votantes Activos', value: Math.max(0, newValue).toLocaleString(), icon: Users, color: 'bg-blue-600' },
        { label: 'Tasa de Participación', value: `${(participation + (Math.random() * 2 - 1)).toFixed(1)}%`, icon: TrendingUp, color: 'bg-green-600' },
        { label: 'Pico de Actividad', value: '14:30', icon: Activity, color: 'bg-purple-600' },
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedCategory, candidateData]);

  return (
    <div className="space-y-6">
      {/* Indicador de categoría seleccionada */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center gap-3">
        <Award className="text-blue-400" size={20} />
        <div>
          <p className="text-sm text-gray-400">Categoría seleccionada en Resultados:</p>
          <p className="text-lg font-semibold text-white">{getCategoryTitle()}</p>
        </div>
      </div>

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
        {/* Flujo de Votación por Hora - TOTAL de todas las categorías */}
        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Activity className="text-blue-400" size={24} />
            Flujo de Votación por Hora
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Total de votos recibidos por hora (suma de todas las categorías: Presidencial + Regional + Distrital)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={totalFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number, name: string) => {
                  if (name === 'totalVotes') return [value.toLocaleString(), 'Total Votos'];
                  return [value.toLocaleString(), name];
                }}
              />
              <Line type="monotone" dataKey="totalVotes" stroke="#3b82f6" strokeWidth={3} name="Total Votos" />
              <Line type="monotone" dataKey="presidencial" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Presidencial" />
              <Line type="monotone" dataKey="regional" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Regional" />
              <Line type="monotone" dataKey="distrital" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Distrital" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución de Votos por Candidato */}
        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="text-purple-400" size={24} />
            Distribución de Votos - {getCategoryTitle()}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={candidateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="votes"
              >
                {candidateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
                formatter={(value: number) => [value.toLocaleString(), 'Votos']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resultados por Candidato según categoría */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Award className="text-yellow-400" size={24} />
          {getChartTitle()}
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

      {/* Votación Acumulada a lo Largo del Día */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Target className="text-green-400" size={24} />
          Votación {getCategoryTitle()} Acumulada a lo Largo del Día
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Votos acumulados desde el inicio del día hasta cada hora (suma progresiva de votos recibidos)
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={accumulatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number) => [value.toLocaleString(), 'Votos Acumulados']}
            />
            <Line 
              type="monotone" 
              dataKey="accumulatedVotes" 
              stroke={selectedCategory === 'presidencial' ? '#3b82f6' : selectedCategory === 'regional' ? '#10b981' : '#8b5cf6'} 
              strokeWidth={3} 
              name="Votos Acumulados"
              dot={{ r: 5, fill: selectedCategory === 'presidencial' ? '#3b82f6' : selectedCategory === 'regional' ? '#10b981' : '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
