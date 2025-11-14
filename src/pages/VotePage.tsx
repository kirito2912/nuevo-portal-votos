import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, User, Calendar, MapPin, AlertCircle, X } from "lucide-react";

// Interface para CandidateCard
interface CandidateCardProps {
  id: number;
  name: string;
  party: string;
  description: string;
  proposals: string[];
  photo: string;
  education: string;
  experience: string;
  onVote: () => void;
}

// Modal de Detalles del Candidato
function CandidateDetailsModal({
  isOpen,
  onClose,
  candidate
}: {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    name: string;
    party: string;
    photo: string;
    description: string;
    education: string;
    experience: string;
    proposals: string[];
  };
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 rounded-2xl max-w-2xl w-full mx-auto shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                {candidate.photo}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
              <div className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mt-2">
                {candidate.party}
              </div>
              <p className="text-gray-600 text-sm mt-3">{candidate.description}</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          {/* Educación y Experiencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎓</span>
                </div>
                <h3 className="font-bold text-gray-900">Educación</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{candidate.education}</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">💼</span>
                </div>
                <h3 className="font-bold text-gray-900">Experiencia Política</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{candidate.experience}</p>
            </div>
          </div>

          {/* Propuestas Principales */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">💡</span>
              </div>
              <h3 className="font-bold text-gray-900">Propuestas Principales</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {candidate.proposals.map((proposal, index) => (
                <div key={index} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{proposal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Modal de Confirmación
function ConfirmVoteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  candidateName, 
  candidateParty,
  voterData 
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidateName: string;
  candidateParty: string;
  voterData: {
    dni: string;
    name: string;
    location: string;
  };
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-2">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Confirmar Voto</h2>
          <p className="text-center text-indigo-100 mt-2">Verifique su selección antes de confirmar</p>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-5">
          {/* Datos del Votante */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Datos del Votante</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-semibold text-blue-900 w-24">DNI:</span>
                <span className="text-gray-700">{voterData.dni}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-blue-900 w-24">Nombre:</span>
                <span className="text-gray-700">{voterData.name}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-blue-900 w-24">Ubicación:</span>
                <span className="text-gray-700">{voterData.location}</span>
              </div>
            </div>
          </div>

          {/* Candidato seleccionado */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
                👩
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900">{candidateName}</h3>
                <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mt-1">
                  {candidateParty}
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  Oficializó su candidatura presidencial por {candidateParty}.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">Propuesta principal:</span>
                </p>
                <p className="text-sm text-gray-600">
                  Fortalecimiento de la seguridad ciudadana
                </p>
              </div>
            </div>
          </div>

          {/* Alerta de atención */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-900">¡Atención!</p>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                  Una vez confirmado, su voto no podrá ser modificado. Esta acción es irreversible.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white h-12 rounded-xl font-semibold text-base"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl font-semibold text-base"
            >
              Confirmar Voto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente CandidateCard con diseño de cuadros
function CandidateCard({ id: _id, name, party, description, proposals, photo, education, experience, onVote }: CandidateCardProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const candidateData = {
    name,
    party,
    photo,
    description,
    education,
    experience,
    proposals
  };

  return (
    <>
      <div className="bg-white rounded-xl border-4 border-blue-600 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        {/* Header con nombre, partido e imagen del candidato */}
        <div className="p-6 bg-white">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
                {photo}
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-600 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mt-1">
                {party}
              </div>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        {/* Propuestas principales */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </div>
            <h4 className="text-sm font-bold text-gray-900">
              Propuestas principales
            </h4>
          </div>
          <div className="space-y-2">
            {proposals.slice(0, 2).map((proposal, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{proposal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer con botones */}
        <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
          <button
            onClick={() => setShowDetailsModal(true)}
            className="flex-1 h-10 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>📄</span>
            Ver más
          </button>
          <button
            onClick={onVote}
            className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>🗳️</span>
            Votar
          </button>
        </div>
      </div>

      <CandidateDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        candidate={candidateData}
      />
    </>
  );
}

// Tipo para categorías de candidatos
type CandidateCategory = 'presidencial' | 'regional' | 'distrital';

export default function VotePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [voterDni, setVoterDni] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterApellidos, setVoterApellidos] = useState("");
  const [voterFechaNacimiento, setVoterFechaNacimiento] = useState("");
  const [voterRegion, setVoterRegion] = useState("");
  const [voterDistrito, setVoterDistrito] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<CandidateCategory>('presidencial');
  
  // Estados para el modal de confirmación
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{
    id: number;
    name: string;
    party: string;
  } | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Candidatos Presidenciales
  const presidentialCandidates = [
    { 
      id: 1, 
      name: "Keiko Fujimori", 
      party: "Fuerza Popular", 
      photo: "👩", 
      description: "Oficializó su candidatura presidencial por Fuerza Popular.", 
      education: "Maestría en Administración Pública - Universidad de Harvard",
      experience: "Líder de Fuerza Popular, excongresista, candidata presidencial en elecciones anteriores",
      proposals: [
        "Fortalecimiento de la seguridad ciudadana",
        "Programas sociales focalizados",
        "Promoción de la inversión privada",
        "Mejora del sistema de salud pública"
      ] 
    },
    { 
      id: 2, 
      name: "Rafael López Aliaga", 
      party: "Renovación Popular", 
      photo: "👨", 
      description: "Renunció a su cargo como alcalde de Lima para postular a la presidencia.", 
      education: "Ingeniero Industrial - Universidad de Lima, MBA en Columbia University",
      experience: "Alcalde de Lima, empresario, líder de Renovación Popular",
      proposals: [
        "Combate frontal a la corrupción",
        "Modernización del Estado",
        "Reducción de la burocracia",
        "Inversión en infraestructura"
      ] 
    },
    { 
      id: 3, 
      name: "César Acuña", 
      party: "Alianza Para el Progreso", 
      photo: "👨", 
      description: "Exgobernador regional, fundó Alianza Para el Progreso.", 
      education: "Doctor en Educación - Universidad Complutense de Madrid",
      experience: "Exgobernador de La Libertad, fundador de Alianza Para el Progreso, empresario educativo",
      proposals: [
        "Masificación de la educación técnica",
        "Impulso a la infraestructura educativa",
        "Desarrollo regional descentralizado",
        "Fomento a la inversión privada"
      ] 
    }
  ];

  // Candidatos Regionales
  const regionalCandidates = [
    { 
      id: 4, 
      name: "Ana María Torres", 
      party: "Fuerza Regional", 
      photo: "👩", 
      description: "Candidata con experiencia en gestión regional.", 
      education: "Licenciada en Administración - Universidad Nacional Mayor de San Marcos",
      experience: "Regidora regional, gestora de proyectos de desarrollo local",
      proposals: [
        "Desarrollo económico local",
        "Mejora de servicios públicos",
        "Inversión en infraestructura regional",
        "Fomento al turismo interno"
      ] 
    },
    { 
      id: 5, 
      name: "Miguel Ángel Castro", 
      party: "Alianza Regional", 
      photo: "👨", 
      description: "Comprometido con el desarrollo de la región.", 
      education: "Ingeniero Agrónomo - Universidad Nacional Agraria La Molina",
      experience: "Consultor en desarrollo rural, líder comunitario regional",
      proposals: [
        "Inversión en infraestructura",
        "Fomento al turismo",
        "Desarrollo agrícola",
        "Mejora de carreteras"
      ] 
    },
    { 
      id: 6, 
      name: "Laura Mendoza", 
      party: "Unión Regional", 
      photo: "👩", 
      description: "Enfoque en desarrollo social y educativo.", 
      education: "Trabajadora Social - Pontificia Universidad Católica del Perú",
      experience: "Directora de programas sociales, activista comunitaria",
      proposals: [
        "Programas sociales",
        "Educación de calidad",
        "Salud comunitaria",
        "Desarrollo cultural"
      ] 
    }
  ];

  // Candidatos Distritales
  const distritalCandidates = [
    { 
      id: 7, 
      name: "Carlos Rojas", 
      party: "Fuerza Distrital", 
      photo: "👨", 
      description: "Trabajando por el desarrollo del distrito.", 
      education: "Abogado - Universidad de San Martín de Porres",
      experience: "Regidor distrital, abogado especializado en gestión municipal",
      proposals: [
        "Seguridad ciudadana",
        "Espacios públicos",
        "Servicios básicos",
        "Cultura y deporte"
      ] 
    },
    { 
      id: 8, 
      name: "Patricia Silva", 
      party: "Alianza Distrital", 
      photo: "👩", 
      description: "Comprometida con las necesidades locales.", 
      education: "Arquitecta - Universidad Ricardo Palma",
      experience: "Urbanista, consultora en desarrollo urbano sostenible",
      proposals: [
        "Servicios básicos",
        "Desarrollo urbano",
        "Medio ambiente",
        "Participación ciudadana"
      ] 
    },
    { 
      id: 9, 
      name: "Javier Quispe", 
      party: "Unión Distrital", 
      photo: "👨", 
      description: "Enfoque en la comunidad y participación.", 
      education: "Contador Público - Universidad Nacional Federico Villarreal",
      experience: "Líder vecinal, promotor de actividades deportivas y culturales",
      proposals: [
        "Participación ciudadana",
        "Cultura y deporte",
        "Juventud y educación",
        "Desarrollo local"
      ] 
    }
  ];

  // Obtener candidatos según la categoría activa
  const getCandidatesByCategory = () => {
    switch (activeCategory) {
      case 'presidencial':
        return presidentialCandidates;
      case 'regional':
        return regionalCandidates;
      case 'distrital':
        return distritalCandidates;
      default:
        return presidentialCandidates;
    }
  };

  // Datos de ejemplo para regiones y distritos
  const regions = [
    "Lima Metropolitana",
    "Arequipa",
    "Cusco",
    "La Libertad",
    "Piura",
    "Lambayeque",
    "Junín",
    "Ancash",
    "Puno",
    "Ica"
  ];

  const distritosByRegion: Record<string, string[]> = {
    "Lima Metropolitana": ["Lima Cercado", "Miraflores", "San Isidro", "Surco", "La Molina", "Barranco"],
    "Arequipa": ["Arequipa", "Cayma", "Yanahuara", "Cerro Colorado", "Sachaca"],
    "Cusco": ["Cusco", "Wanchaq", "San Sebastián", "San Jerónimo"],
    "La Libertad": ["Trujillo", "Víctor Larco", "Moche", "Laredo"],
    "Piura": ["Piura", "Castilla", "Catacaos", "Veintiséis de Octubre"],
    "Lambayeque": ["Chiclayo", "José Leonardo Ortiz", "La Victoria", "Pimentel"],
    "Junín": ["Huancayo", "Chilca", "El Tambo", "Pilcomayo"],
    "Ancash": ["Huaraz", "Carhuaz", "Caraz", "Yungay"],
    "Puno": ["Puno", "Juliaca", "Ilave", "Ayaviri"],
    "Ica": ["Ica", "Pisco", "Chincha", "Nazca"]
  };

  // Función para calcular edad
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Validar edad cuando cambia la fecha de nacimiento
  const handleFechaNacimientoChange = (fecha: string) => {
    setVoterFechaNacimiento(fecha);
    setError("");
    
    if (fecha) {
      const age = calculateAge(fecha);
      setIsMinor(age < 18);
    } else {
      setIsMinor(false);
    }
  };

  // Función para manejar el clic en votar (abre el modal)
  const handleVoteClick = (candidateId: number, candidateName: string, candidateParty: string) => {
    setSelectedCandidate({
      id: candidateId,
      name: candidateName,
      party: candidateParty
    });
    setShowConfirmModal(true);
  };

  // Función para confirmar el voto (después del modal)
  const handleConfirmVote = () => {
    if (selectedCandidate) {
      console.log(`Voto registrado para: ${selectedCandidate.name} (ID: ${selectedCandidate.id})`);
      setShowConfirmModal(false);
      setSelectedCandidate(null);
      
      // Mostrar toast de éxito
      setShowSuccessToast(true);
      
      // Ocultar el toast después de 3 segundos
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }
  };

  // Función para cancelar el voto
  const handleCancelVote = () => {
    setShowConfirmModal(false);
    setSelectedCandidate(null);
  };

  // Envío del formulario de acceso
  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    // Validaciones
    if (!voterDni || !voterName || !voterApellidos || !voterFechaNacimiento || !voterRegion || !voterDistrito) {
      setError("Por favor complete todos los campos requeridos");
      setIsSubmitting(false);
      return;
    }

    if (!/^\d{8}$/.test(voterDni)) {
      setError("El DNI debe tener exactamente 8 dígitos");
      setIsSubmitting(false);
      return;
    }

    // Validar edad
    const age = calculateAge(voterFechaNacimiento);
    if (age < 18) {
      setIsMinor(true);
      setError("Debe ser mayor de 18 años para ejercer el derecho al voto");
      setIsSubmitting(false);
      return;
    }

    // Simular verificación (en producción aquí iría la API)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsMinor(false);
    setIsAuthenticated(true);
    setIsSubmitting(false);
  };

  // Si está autenticado, muestra la página de votación con los candidatos
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Mensaje de verificación exitosa */}
          <div className="text-center mb-12">
            <div className="inline-block bg-green-500/20 border border-green-500/30 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-2xl font-bold text-green-400">Identidad verificada exitosamente</h2>
              <p className="text-green-300 mt-2">Ahora puede proceder a votar</p>
            </div>
            
            {/* Título y descripción */}
            <h1 className="text-4xl font-bold text-white mb-4">Candidatos</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conozca las propuestas y trayectoria de cada candidato para tomar una decisión informada.
            </p>
          </div>

          {/* Pestañas de categorías */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 flex space-x-2 shadow-lg">
              <button
                onClick={() => setActiveCategory('presidencial')}
                className={`px-12 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === 'presidencial'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Presidencial
              </button>
              <button
                onClick={() => setActiveCategory('regional')}
                className={`px-12 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === 'regional'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Regional
              </button>
              <button
                onClick={() => setActiveCategory('distrital')}
                className={`px-12 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === 'distrital'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Distrital
              </button>
            </div>
          </div>

          {/* Grid de candidatos - 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getCandidatesByCategory().map((candidate) => (
              <CandidateCard
                key={candidate.id}
                id={candidate.id}
                name={candidate.name}
                party={candidate.party}
                description={candidate.description}
                proposals={candidate.proposals}
                photo={candidate.photo}
                education={candidate.education}
                experience={candidate.experience}
                onVote={() => handleVoteClick(candidate.id, candidate.name, candidate.party)}
              />
            ))}
          </div>

          {/* Botón para volver al inicio */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Volver al Inicio
            </Button>
          </div>

          {/* Modal de Confirmación */}
          <ConfirmVoteModal
            isOpen={showConfirmModal}
            onClose={handleCancelVote}
            onConfirm={handleConfirmVote}
            candidateName={selectedCandidate?.name || ""}
            candidateParty={selectedCandidate?.party || ""}
            voterData={{
              dni: voterDni,
              name: `${voterName} ${voterApellidos}`,
              location: `${voterDistrito}, ${voterRegion}`
            }}
          />

          {/* Toast de éxito */}
          {showSuccessToast && (
            <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
              <div className="bg-gray-900 text-white rounded-lg shadow-2xl px-6 py-4 flex items-center gap-3 border border-gray-700">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">¡Voto registrado exitosamente!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista de verificación previa (formulario original)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado Izquierdo - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto lg:mx-0">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sistema Electoral
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mt-4">
                Nacional
              </span>
            </h1>
            <p className="text-2xl text-blue-200 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Plataforma segura y verificada para ejercer su derecho al voto
            </p>
          </div>

          <div className="hidden lg:block space-y-6">
            <div className="flex items-center gap-4 text-blue-200 text-lg">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <span>Verificación de identidad segura</span>
            </div>
            <div className="flex items-center gap-4 text-blue-200 text-lg">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Lock className="h-5 w-5 text-blue-400" />
              </div>
              <span>Encriptación de extremo a extremo</span>
            </div>
            <div className="flex items-center gap-4 text-blue-200 text-lg">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <span>Protección de datos personales</span>
            </div>
          </div>
        </div>

        {/* Lado Derecho - Formulario */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl text-white mb-4">Verificación de Identidad</CardTitle>
              <CardDescription className="text-blue-200 text-lg">
                Ingrese sus datos oficiales para acceder al sistema
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleAccessSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DNI */}
                <div className="space-y-4">
                  <Label htmlFor="dni" className="text-white font-semibold text-base">
                    Número de DNI *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="dni"
                      value={voterDni}
                      onChange={(e) => setVoterDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
                      placeholder="12345678"
                      maxLength={8}
                      required
                      className="pl-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 text-base"
                    />
                  </div>
                </div>

                {/* Nombres */}
                <div className="space-y-4">
                  <Label htmlFor="nombre" className="text-white font-semibold text-base">
                    Nombres *
                  </Label>
                  <Input
                    id="nombre"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    placeholder="Juan Carlos"
                    required
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 text-base"
                  />
                </div>

                {/* Apellidos */}
                <div className="space-y-4">
                  <Label htmlFor="apellidos" className="text-white font-semibold text-base">
                    Apellidos Completos *
                  </Label>
                  <Input
                    id="apellidos"
                    value={voterApellidos}
                    onChange={(e) => setVoterApellidos(e.target.value)}
                    placeholder="Pérez García"
                    required
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 text-base"
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="space-y-4">
                  <Label htmlFor="fechaNacimiento" className="text-white font-semibold text-base">
                    Fecha de Nacimiento *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="fechaNacimiento"
                      type="date"
                      value={voterFechaNacimiento}
                      onChange={(e) => handleFechaNacimientoChange(e.target.value)}
                      required
                      max={new Date().toISOString().split('T')[0]}
                      className="pl-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    />
                  </div>
                  {isMinor && (
                    <div className="flex items-center gap-3 text-amber-300 text-sm bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                      <AlertCircle className="h-5 w-5" />
                      <span>Debe ser mayor de 18 años para votar</span>
                    </div>
                  )}
                </div>

                {/* Región */}
                <div className="space-y-4">
                  <Label htmlFor="region" className="text-white font-semibold text-base">
                    Región *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 z-10" />
                    <Select 
                      value={voterRegion} 
                      onValueChange={(value) => {
                        setVoterRegion(value);
                        setVoterDistrito("");
                      }}
                    >
                      <SelectTrigger className="pl-12 h-12 bg-white/5 border-white/20 text-white focus:border-blue-400">
                        <SelectValue placeholder="Seleccione su región" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-white/20 text-white">
                        {regions.map((region) => (
                          <SelectItem 
                            key={region} 
                            value={region}
                            className="focus:bg-blue-500 text-base"
                          >
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Distrito */}
                <div className="space-y-4">
                  <Label htmlFor="distrito" className="text-white font-semibold text-base">
                    Distrito de Residencia *
                  </Label>
                  <Select 
                    value={voterDistrito} 
                    onValueChange={setVoterDistrito}
                    disabled={!voterRegion}
                  >
                    <SelectTrigger className="h-12 bg-white/5 border-white/20 text-white focus:border-blue-400">
                      <SelectValue placeholder={voterRegion ? "Seleccione su distrito" : "Primero seleccione región"} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/20 text-white">
                      {voterRegion && distritosByRegion[voterRegion]?.map((distrito) => (
                        <SelectItem 
                          key={distrito} 
                          value={distrito}
                          className="focus:bg-blue-500 text-base"
                        >
                          {distrito}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Botón enviar */}
              <Button 
                type="submit" 
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                disabled={isSubmitting || isMinor}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Verificando Identidad...
                  </>
                ) : isMinor ? (
                  "Acceso Restringido - Menor de Edad"
                ) : (
                  "Verificar Identidad y Acceder"
                )}
              </Button>
            </form>

            {/* Pie */}
            <div className="text-center pt-6 border-t border-white/10">
              <p className="text-blue-300 text-base">
                🔒 Sus datos están protegidos 
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}