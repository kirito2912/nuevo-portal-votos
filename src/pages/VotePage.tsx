import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, User, Calendar, MapPin, AlertCircle, X, BookOpen, Target, Award, ArrowLeft } from "lucide-react";
import { loadCandidates } from "@/services/dataStore";
import { getVoterByDni } from "@/services/voterService";

// Componente Modal de Detalles del Candidato
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
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full mx-auto shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="bg-gray-900 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border-2 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-600">
                <img 
                  src={candidate.photo} 
                  alt={`Foto de ${candidate.name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">${candidate.name.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{candidate.name}</h2>
              <Badge className="bg-blue-600 text-white text-base px-3 py-1">
                {candidate.party}
              </Badge>
              <p className="text-gray-300 mt-3 leading-relaxed">{candidate.description}</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Educación y Experiencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-white">Formación Académica</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{candidate.education}</p>
            </div>

            <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-white">Experiencia Profesional</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{candidate.experience}</p>
            </div>
          </div>

          {/* Propuestas Principales */}
          <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold text-white">Propuestas Principales</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {candidate.proposals.map((proposal, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-600/50 p-3 rounded-lg">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{proposal}</span>
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
  candidatePhoto,
  voterData 
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidateName: string;
  candidateParty: string;
  candidatePhoto: string;
  voterData: {
    dni: string;
    name: string;
    location: string;
  };
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full mx-auto shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-2">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Confirmar Voto</h2>
          <p className="text-center text-blue-100 mt-2">Verifique su selección antes de confirmar</p>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-5">
          {/* Datos del Votante */}
          <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Datos del Votante</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-300">DNI:</span>
                <span className="text-white">{voterData.dni}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-300">Nombre:</span>
                <span className="text-white">{voterData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-300">Ubicación:</span>
                <span className="text-white">{voterData.location}</span>
              </div>
            </div>
          </div>

          {/* Candidato seleccionado */}
          <div className="border-t border-gray-600 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 flex-shrink-0">
                <img 
                  src={candidatePhoto} 
                  alt={`Foto de ${candidateName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">${candidateName.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-white">{candidateName}</h3>
                <Badge className="bg-blue-600 text-white text-sm mt-1">
                  {candidateParty}
                </Badge>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                  Su voto será registrado para este candidato.
                </p>
              </div>
            </div>
          </div>

          {/* Alerta de atención */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-400">¡Atención!</p>
                <p className="text-sm text-amber-300 mt-1 leading-relaxed">
                  Una vez confirmado, su voto no podrá ser modificado. Esta acción es irreversible.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white h-12 rounded-xl font-semibold text-base"
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

// Componente CandidateCard MEJORADO
function CandidateCard({ id: _id, name, party, description, proposals, photo, education, experience, onVote }: any) {
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
      <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl h-full">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Header del candidato */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600">
                <img 
                  src={photo} 
                  alt={`Foto de ${name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">${name.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <Badge className="bg-blue-600 text-white mt-1">{party}</Badge>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">{description}</p>
            </div>
          </div>

          {/* Propuestas destacadas */}
          <div className="mb-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-white">Propuestas Destacadas</span>
            </div>
            <div className="space-y-2">
              {proposals.slice(0, 2).map((proposal: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{proposal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Educación breve */}
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <span className="text-gray-400 text-sm truncate">{education.split(' - ')[0]}</span>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mt-auto">
            <Button
              onClick={() => setShowDetailsModal(true)}
              variant="outline"
              className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Detalles
            </Button>
            <Button
              onClick={onVote}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Award className="h-4 w-4 mr-2" />
              Votar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalles */}
      <CandidateDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        candidate={candidateData}
      />
    </>
  );
}

export default function VotePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'presidencial' | 'regional' | 'distrital'>('presidencial');
  const [voterDni, setVoterDni] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterApellidos, setVoterApellidos] = useState("");
  const [voterFechaNacimiento, setVoterFechaNacimiento] = useState("");
  const [voterRegion, setVoterRegion] = useState(""); 
  const [voterDistrito, setVoterDistrito] = useState(""); 
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiToken, setApiToken] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true
    const run = async () => {
      if (/^\d{8}$/.test(voterDni)) {
        const token = (() => {
          try { return localStorage.getItem('sen:voterApiToken') || '' } catch { return '' }
        })()
        const rec = await getVoterByDni(voterDni, token)
        if (!active) return
        setVoterName(rec.nombres || "")
        setVoterApellidos(rec.apellidos || "")
        setVoterFechaNacimiento(rec.fechaNacimiento || "")
        setVoterRegion(rec.region || "")
        setVoterDistrito(rec.distrito || "")
      }
    }
    run()
    return () => { active = false }
  }, [voterDni])

  useEffect(() => {
    try {
      const t = localStorage.getItem('sen:voterApiToken') || ''
      const u = localStorage.getItem('sen:voterApiUrl') || ''
      setApiToken(t)
      setApiUrl(u)
    } catch {}
  }, [])
  
  // Estados para el modal de confirmación
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{
    id: number;
    name: string;
    party: string;
    photo: string;
  } | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Categorías para las pestañas
  const categories = [
    { id: 'presidencial' as const, name: 'Presidencial', icon: Award },
    { id: 'regional' as const, name: 'Regional', icon: MapPin },
    { id: 'distrital' as const, name: 'Distrital', icon: User }
  ];

  // Candidatos Presidenciales
  const presidentialCandidates = [
  {
    id: 1,
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    photo: "/assets/candidates/keiko.PNG",
    description: "Figura estable en encuestas, con énfasis en orden y reactivación económica.",
    education: "Administración – Boston University",
    experience: "Excongresista y lideresa de Fuerza Popular",
    proposals: ["Seguridad ciudadana", "Reactivación económica", "Reforma judicial", "Programas sociales"]
  },
  {
    id: 2,
    name: "Rafael López Aliaga",
    party: "Renovación Popular",
    photo: "/assets/candidates/porky.PNG",
    description: "Líder conservador con fuerte presencia nacional.",
    education: "Ingeniería Industrial – Universidad de Lima",
    experience: "Exalcalde de Lima",
    proposals: ["Orden y seguridad", "Inversión privada", "Reforma policial", "Infraestructura moderna"]
  },
    {
    id: 3,
    name: "Verónika Mendoza",
    party: "Nuevo Perú",
    photo: "/assets/candidates/mendoza.JPG",
    description: "Lideresa progresista con propuestas de reforma social.",
    education: "Psicología – Universidad de París",
    experience: "Excongresista",
    proposals: [
      "Transición energética",
      "Reforma laboral",
      "Estado social fuerte",
      "Impulso a PYMES"
    ]
  },
  {
    id: 4,
    name: "Hernando de Soto",
    party: "Avanza País",
    photo: "/assets/candidates/desoto.JPG",
    description: "Economista global de línea liberal.",
    education: "Economía – Suiza",
    experience: "Presidente del ILD",
    proposals: ["Formalización total", "Libre mercado", "Gobierno digital", "Simplificación burocrática"]
  },
  {
    id: 5,
    name: "Cesar Acuña",
    party: "Alianza para el Progreso",
    photo: "/assets/candidates/acuña.PNG",
    description: "Enfoque en educación y descentralización.",
    education: "Doctor en Educación - Universidad Complutense",
    experience: "Exgobernador y fundador de APP",
    proposals: [
      "Educación técnica",
      "Infraestructura educativa",
      "Desarrollo regional",
      "Impulso económico"
    ]
  },
  {
    id: 6,
    name: "López Chau",
    party: "Ahora Nación",
    photo: "/assets/candidates/lopezchau.JPG",
    description: "Figura académica con proyección nacional.",
    education: "Economía – UNMSM",
    experience: "Analista político",
    proposals: ["Soberanía económica", "Educación pública", "Transporte moderno", "Empleo nacional"]
  },
  {
    id: 7,
    name: "Carlos Espá",
    party: "SíCreo",
    photo: "/assets/candidates/espa.JPG",
    description: "Figura digital con discurso liberal.",
    education: "Economía – UPN",
    experience: "Creador de contenido político",
    proposals: ["Menos Estado", "Transparencia blockchain", "Libre mercado", "Gobierno digital"]
  },
  {
    id: 8,
    name: "Carlos Álvarez",
    party: "País para Todos",
    photo: "/assets/candidates/alvarez.PNG",
    description: "Figura mediática con discurso anticorrupción.",
    education: "Comunicaciones – IPM",
    experience: "Actor y activista",
    proposals: ["Lucha anticorrupción", "Educación cívica", "Salud accesible", "Reforma policial"]
  },
  {
    id: 9,
    name: "Phillip Butters",
    party: "Voz del Pueblo",
    photo: "/assets/candidates/phillip.PNG",
    description: "Comunicador conservador con base sólida.",
    education: "Periodismo – USMP",
    experience: "Conductor radial",
    proposals: ["Seguridad total", "Migración controlada", "Justicia estricta", "Reforma del Estado"]
  },
  {
    id: 10,
    name: "Wolfgang Grozo",
    party: "Soberanía Digital",
    photo: "/assets/candidates/grozo.JPG",
    description: "Creador político digital con fuerte llegada juvenil.",
    education: "Negocios – UPC",
    experience: "Analista digital",
    proposals: ["Ciberseguridad", "Digitalización total", "Eficiencia estatal", "Transparencia nacional"]
  }
];


  // Candidatos Regionales
  const regionalCandidates = [
    { 
      id: 11, 
      name: "Ana María Torres", 
      party: "Fuerza Regional", 
      photo: "/assets/candidates/ana-maria-torres.jpg", 
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
      id: 12, 
      name: "Miguel Ángel Castro", 
      party: "Alianza Regional", 
      photo: "/assets/candidates/miguel-angel-castro.JPG", 
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
      id: 13, 
      name: "Laura Mendoza", 
      party: "Unión Regional", 
      photo: "/assets/candidates/laura_mendoza.JPG", 
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
      id: 14, 
      name: "Carlos Rojas", 
      party: "Fuerza Distrital", 
      photo: "/assets/candidates/carlos-rojas.JPG", 
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
      id: 15, 
      name: "Patricia Silva", 
      party: "Alianza Distrital", 
      photo: "/assets/candidates/patricia-silva.JPG", 
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
      id: 16, 
      name: "Javier Quispe", 
      party: "Unión Distrital", 
      photo: "/assets/candidates/javier-quispe.JPG", 
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
    if (activeCategory === 'presidencial') {
      const s = loadCandidates('presidencial')
      return s.length ? s : presidentialCandidates
    }
    if (activeCategory === 'regional') {
      const s = loadCandidates('regional')
      return s.length ? s : regionalCandidates
    }
    if (activeCategory === 'distrital') {
      const s = loadCandidates('distrital')
      return s.length ? s : distritalCandidates
    }
    return presidentialCandidates
  };

  // TODAS LAS REGIONES DEL PERÚ
  const regions = [
    "Amazonas",
    "Áncash",
    "Apurímac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",
    "Cusco",
    "Huancavelica",
    "Huánuco",
    "Ica",
    "Junín",
    "La Libertad",
    "Lambayeque",
    "Lima",
    "Lima Metropolitana",
    "Loreto",
    "Madre de Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martín",
    "Tacna",
    "Tumbes",
    "Ucayali"
  ];

  const distritosByRegion: Record<string, string[]> = {
    "Amazonas": ["Chachapoyas", "Asunción", "Balsas", "Cheto", "Chiliquín", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba", "Levanto", "Magdalena", "Mariscal Castilla", "Molinopampa", "Montevideo", "Olleros", "Quinjalca", "San Francisco de Daguas", "San Isidro de Maino", "Soloco", "Sonche"],
    "Áncash": ["Huaraz", "Cochabamba", "Colcabamba", "Huanchay", "Independencia", "Jangas", "La Libertad", "Olleros", "Pampas Grande", "Pariacoto", "Pira", "Tarica", "Aija", "Coris", "Huacllán", "La Merced", "Succha", "Antonio Raymondi", "Llamellín", "Aczo"],
    "Apurímac": ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama", "Pichirhua", "San Pedro de Cachora", "Tamburco", "Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Huayana", "Kishuará", "Pacobamba", "Pacucha", "Pampachiri", "Pomacocha"],
    "Arequipa": ["Arequipa", "Alto Selva Alegre", "Cayma", "Cerro Colorado", "Characato", "Chiguata", "Jacobo Hunter", "La Joya", "Mariano Melgar", "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandia", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas"],
    "Ayacucho": ["Ayacucho", "Acocro", "Acos Vinchos", "Carmen Alto", "Chiara", "Ocros", "Pacaycasa", "Quinua", "San José de Ticllas", "San Juan Bautista", "Santiago de Pischa", "Socos", "Tambillo", "Vinchos", "Jesús Nazareno", "Andrés Avelino Cáceres Dorregaray", "Cangallo", "Chuschi", "Los Morochucos", "María Parado de Bellido"],
    "Cajamarca": ["Cajamarca", "Asunción", "Chetilla", "Cospan", "Encañada", "Jesús", "Llacanora", "Los Baños del Inca", "Magdalena", "Matara", "Namora", "San Juan", "Cajabamba", "Cachachi", "Condebamba", "Sitacocha", "Celendín", "Chumuch", "Cortegana", "Huasmin"],
    "Callao": ["Callao", "Bellavista", "Carmen de la Legua Reynoso", "La Perla", "La Punta", "Ventanilla", "Mi Perú"],
    "Cusco": ["Cusco", "Ccorca", "Poroy", "San Jerónimo", "San Sebastián", "Santiago", "Saylla", "Wanchaq", "Acomayo", "Acopia", "Acos", "Mosoc Llacta", "Pomacanchi", "Rondocan", "Sangarará", "Anta", "Ancahuasi", "Cachimayo", "Chinchaypujio", "Huarocondo"],
    "Huancavelica": ["Huancavelica", "Acobambilla", "Acoria", "Conayca", "Cuenca", "Huachocolpa", "Huayllahuara", "Izcuchaca", "Laria", "Manta", "Mariscal Cáceres", "Moya", "Nuevo Occoro", "Palca", "Pilchaca", "Vilca", "Yauli", "Ascensión", "Huando", "Acobamba"],
    "Huánuco": ["Huánuco", "Amarilis", "Chinchao", "Churubamba", "Margos", "Quisqui", "San Francisco de Cayran", "San Pedro de Chaulán", "Santa María del Valle", "Yarumayo", "Pillco Marca", "Ambo", "Cayna", "Colpas", "Conchamarca", "Huácar", "San Francisco", "San Rafael", "Tomay Kichwa", "Dos de Mayo"],
    "Ica": ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacutec", "Parcona", "Pueblo Nuevo", "Salas", "San José de Los Molinos", "San Juan Bautista", "Santiago", "Subtanjalla", "Tate", "Yauca del Rosario", "Chincha", "Alto Larán", "Chavin", "Chincha Baja", "El Carmen", "Grocio Prado"],
    "Junín": ["Huancayo", "Carhuacallanga", "Chacapampa", "Chicche", "Chilca", "Chongos Alto", "Chupuro", "Colca", "Cullhuas", "El Tambo", "Huacrapuquio", "Hualhuas", "Huancan", "Huasicancha", "Huayucachi", "Ingenio", "Pariahuanca", "Pilcomayo", "Pucará", "Quichuay"],
    "La Libertad": ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Víctor Larco Herrera", "Ascope", "Chicama", "Chocope", "Magdalena de Cao", "Paiján", "Rázuri", "Santiago de Cao", "Casa Grande", "Bolívar"],
    "Lambayeque": ["Chiclayo", "Chongoyape", "Eten", "Eten Puerto", "José Leonardo Ortiz", "La Victoria", "Lagunas", "Monsefú", "Nueva Arica", "Oyotún", "Picsi", "Pimentel", "Reque", "Santa Rosa", "Saña", "Cayaltí", "Pátapo", "Pomalca", "Pucalá", "Tumán"],
    "Lima": ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto", "Cajatambo", "Copa", "Gorgor", "Huancapon", "Manas", "Canta", "Arahuay", "Huamantanga", "Huaros", "Lachaqui", "San Buenaventura", "Santa Rosa de Quives", "Cañete", "Asia", "Calango"],
    "Lima Metropolitana": ["Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar"],
    "Loreto": ["Maynas", "Iquitos", "Alto Nanay", "Fernando Lores", "Indiana", "Las Amazonas", "Mazan", "Napo", "Punchana", "Torres Causana", "Belén", "San Juan Bautista", "Alto Amazonas", "Yurimaguas", "Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente César López Rojas", "Datem del Marañón"],
    "Madre de Dios": ["Tambopata", "Inambari", "Las Piedras", "Laberinto", "Manu", "Fitzcarrald", "Madre de Dios", "Huepetuhe", "Tahuamanu", "Iberia", "Iñapari"],
    "Moquegua": ["Mariscal Nieto", "Moquegua", "Carumas", "Cuchumbaya", "Samegua", "San Cristóbal", "Torata", "General Sánchez Cerro", "Omate", "Chojata", "Coalaque", "Ichuña", "La Capilla", "Lloque", "Matalaque", "Puquina", "Quinistaquillas", "Ubinas", "Yunga", "Ilo"],
    "Pasco": ["Pasco", "Chaupimarca", "Huachon", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra", "Paucartambo", "San Francisco de Asís de Yarusyacan", "Simon Bolívar", "Ticlacayan", "Tinyahuarco", "Vicco", "Yanacancha", "Daniel Alcides Carrión", "Yanahuanca", "Chacayan", "Goyllarisquizga", "Paucar", "San Pedro de Pillao"],
    "Piura": ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallán", "La Arena", "La Unión", "Las Lomas", "Tambo Grande", "Ayabaca", "Frias", "Jilili", "Lagunas", "Montero", "Pacaipampa", "Paimas", "Sapillica", "Sicchez", "Suyo", "Huancabamba"],
    "Puno": ["Puno", "Acora", "Amantani", "Atuncolla", "Capachica", "Chucuito", "Coata", "Huata", "Mañazo", "Paucarcolla", "Pichacani", "Platería", "San Antonio", "Tiquillaca", "Vilque", "Azángaro", "Achaya", "Arapa", "Asillo", "Caminaca"],
    "San Martín": ["Moyobamba", "Calzada", "Habana", "Jepelacio", "Soritor", "Yantalo", "Bellavista", "Alto Biavo", "Bajo Biavo", "Huallaga", "San Pablo", "San Rafael", "El Dorado", "Agua Blanca", "San José de Sisa", "San Martín", "Shapaja", "Chazuta", "Chipurana", "Huimbayoc"],
    "Tacna": ["Tacna", "Alto de la Alianza", "Calana", "Ciudad Nueva", "Inclan", "Pachia", "Palca", "Pocollay", "Sama", "Coronel Gregorio Albarracín Lanchipa", "Candarave", "Cairani", "Camilaca", "Curibaya", "Huanuara", "Quilahuani", "Jorge Basadre", "Locumba", "Ilabaya", "Ite"],
    "Tumbes": ["Tumbes", "Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de la Virgen", "Contralmirante Villar", "Zorritos", "Casitas", "Canoas de Punta Sal", "Zarumilla", "Aguas Verdes", "Matapalo", "Papayal"],
    "Ucayali": ["Coronel Portillo", "Callería", "Campoverde", "Iparia", "Masisea", "Yarinacocha", "Nueva Requena", "Manantay", "Atalaya", "Raymondi", "Sepahua", "Tahuania", "Yurúa", "Padre Abad", "Irazola", "Curimaná", "Neshuya", "Alexander Von Humboldt", "Purús", "Purús"]
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
  const handleVoteClick = (candidateId: number, candidateName: string, candidateParty: string, candidatePhoto: string) => {
    setSelectedCandidate({
      id: candidateId,
      name: candidateName,
      party: candidateParty,
      photo: candidatePhoto
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

  // SI está autenticado, mostrar la INTERFAZ MEJORADA de candidatos
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Header */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsAuthenticated(false)}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Volver
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Sistema de Votación</h1>
                  <p className="text-gray-400">Seleccione su candidato preferido</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-600 text-white">
                Identidad Verificada ✓
              </Badge>
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-blue-600 border-blue-500 transform scale-105' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <category.icon className={`h-8 w-8 mx-auto mb-3 ${
                    activeCategory === category.id ? 'text-white' : 'text-blue-400'
                  }`} />
                  <h3 className="font-semibold text-lg text-white">
                    {category.name}
                  </h3>
                  <p className={`text-sm ${
                    activeCategory === category.id ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {getCandidatesByCategory().length} candidatos
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Grid de candidatos MEJORADO */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                onVote={() => handleVoteClick(candidate.id, candidate.name, candidate.party, candidate.photo)}
              />
            ))}
          </div>

          {/* Información de seguridad */}
          <Card className="mt-8 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Votación Segura</h3>
                </div>
                <p className="text-gray-400">
                  Su voto es anónimo y está protegido con cifrado de grado militar. 
                  Una vez confirmado, no podrá ser modificado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal de Confirmación */}
        <ConfirmVoteModal
          isOpen={showConfirmModal}
          onClose={handleCancelVote}
          onConfirm={handleConfirmVote}
          candidateName={selectedCandidate?.name || ""}
          candidateParty={selectedCandidate?.party || ""}
          candidatePhoto={selectedCandidate?.photo || ""}
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
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl text-white mb-3 sm:mb-4">Verificación de Identidad</CardTitle>
              <CardDescription className="text-blue-200 text-base sm:text-lg">
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

            <form onSubmit={handleAccessSubmit} className="space-y-6 sm:space-y-8">
              <div className="flex items-center justify-end">
                <button type="button" onClick={() => setShowApiConfig(v => !v)} className="text-xs px-2 py-1 rounded-md bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-700">Configurar API</button>
              </div>
              {showApiConfig && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-dark-card/60 p-4 rounded-lg border border-gray-700">
                  <div className="space-y-2">
                    <Label htmlFor="apiToken" className="text-white text-sm">Token JWT</Label>
                    <Input id="apiToken" value={apiToken} onChange={(e)=>setApiToken(e.target.value)} className="h-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400" placeholder="pegue su token aquí" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiUrl" className="text-white text-sm">Base URL</Label>
                    <Input id="apiUrl" value={apiUrl} onChange={(e)=>setApiUrl(e.target.value)} className="h-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400" placeholder="https://api.ejemplo.com" />
                  </div>
                  <div className="md:col-span-2">
                    <button type="button" onClick={() => { try { localStorage.setItem('sen:voterApiToken', apiToken||''); localStorage.setItem('sen:voterApiUrl', apiUrl||''); } catch {} }} className="text-xs px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">Guardar configuración</button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
