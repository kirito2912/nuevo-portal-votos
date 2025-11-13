import { Calendar, Shield, Eye } from 'lucide-react';

export default function HomePage() {
  const processes = [
    { id: 1, title: 'Elecciones Presidenciales 2024', date: '15 de Diciembre, 2024', status: 'Activo' },
    { id: 2, title: 'Elecciones Municipales 2024', date: '20 de Noviembre, 2024', status: 'Próximo' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Seguridad',
      description: 'Sistema encriptado de extremo a extremo para garantizar la integridad del voto',
    },
    {
      icon: Eye,
      title: 'Transparencia',
      description: 'Resultados en tiempo real y auditoría completa del proceso electoral',
    },
    {
      icon: Calendar,
      title: 'Accesibilidad',
      description: 'Vota desde cualquier lugar de forma segura y conveniente',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Bienvenido al Sistema Electoral Nacional</h1>
        <p className="text-gray-400">Participa en la democracia de forma segura y transparente</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Procesos Electorales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processes.map((process) => (
            <div key={process.id} className="bg-dark-card rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{process.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    process.status === 'Activo'
                      ? 'bg-green-600 text-white'
                      : 'bg-yellow-600 text-white'
                  }`}
                >
                  {process.status}
                </span>
              </div>
              <p className="text-gray-400 flex items-center gap-2">
                <Calendar size={16} />
                {process.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Características del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-dark-card rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
