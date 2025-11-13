import { X } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  party: string;
  photo: string;
  education: string;
  proposals: string[];
}

interface CandidateModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onVote: (id: number) => void;
}

export default function CandidateModal({ candidate, onClose, onVote }: CandidateModalProps) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{candidate.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-3xl">
              {candidate.photo}
            </div>
            <div>
              <p className="text-lg text-blue-400">{candidate.party}</p>
              <p className="text-sm text-gray-400">{candidate.education}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Propuestas</h3>
            <ul className="space-y-2">
              {candidate.proposals.map((proposal, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-gray-300">{proposal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onVote(candidate.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Votar por este candidato
            </button>
            <button
              onClick={onClose}
              className="px-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
