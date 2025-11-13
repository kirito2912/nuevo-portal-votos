interface CandidateCardProps {
  id: number;
  name: string;
  party: string;
  photo: string;
  onClick: () => void;
}

export default function CandidateCard({ name, party, photo, onClick }: CandidateCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-dark-card rounded-lg p-6 cursor-pointer hover:bg-dark-hover transition-all hover:scale-105 border border-gray-700"
    >
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-600 mb-4 flex items-center justify-center text-3xl">
          {photo}
        </div>
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-sm text-gray-400 mt-1">{party}</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">
          Ver Detalles
        </button>
      </div>
    </div>
  );
}
