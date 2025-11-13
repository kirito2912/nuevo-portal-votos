import { useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import CandidateModal from '../components/CandidateModal';

export default function VotePage() {
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'María González',
      party: 'Partido Progresista',
      photo: '👩',
      education: 'Licenciada en Derecho, Universidad Nacional',
      proposals: [
        'Reforma educativa integral',
        'Mejora del sistema de salud pública',
        'Creación de empleos sostenibles',
      ],
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      party: 'Alianza Nacional',
      photo: '👨',
      education: 'Economista, MBA en Gestión Pública',
      proposals: [
        'Reducción de impuestos para pequeñas empresas',
        'Inversión en infraestructura',
        'Modernización tecnológica del estado',
      ],
    },
    {
      id: 3,
      name: 'Ana Martínez',
      party: 'Movimiento Verde',
      photo: '👩‍🦰',
      education: 'Ingeniera Ambiental, Doctora en Sostenibilidad',
      proposals: [
        'Transición a energías renovables',
        'Protección de áreas naturales',
        'Economía circular y sostenible',
      ],
    },
  ];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVote = (candidateId: number) => {
    setVoteConfirmed(true);
    setSelectedCandidate(null);
    setTimeout(() => {
      alert('¡Voto registrado exitosamente!');
      setStep(1);
      setVoteConfirmed(false);
    }, 1500);
  };

  if (voteConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-400">¡Voto Registrado!</h2>
          <p className="text-gray-400 mt-2">Gracias por participar en la democracia</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Proceso de Votación</h1>

      {step === 1 && (
        <div className="max-w-2xl">
          <div className="bg-dark-card rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Verificación de Identidad</h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">DNI</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="12345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nombres Completos</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fecha de Nacimiento</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Verificar y Continuar
              </button>
            </form>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Selecciona tu Candidato</h2>
            <p className="text-gray-400">Haz clic en un candidato para ver sus propuestas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                {...candidate}
                onClick={() => setSelectedCandidate(candidate)}
              />
            ))}
          </div>

          <CandidateModal
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onVote={handleVote}
          />
        </div>
      )}
    </div>
  );
}
