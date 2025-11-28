import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, BarChart3, Users, Shield, Calendar, MessageCircle, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Componente Chatbot - Diseño oscuro profesional
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: '¡Hola! Soy tu asistente electoral. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "¿Cómo votar?",
    "¿Quiénes son los candidatos?",
    "¿Es seguro el sistema?",
    "¿Cuándo son las elecciones?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const wasWaiting = waitingForInput;
    const newMessages = [...messages, { role: 'user', text: inputMessage }];
    setMessages(newMessages);
    setShowQuickQuestions(false);
    setWaitingForInput(false);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      
      if (!wasWaiting) {
        botResponse = 'Por favor, selecciona una de las opciones disponibles para poder ayudarte mejor.';
      } else {
        if (inputMessage.toLowerCase().includes('votar') || inputMessage.toLowerCase().includes('cómo')) {
          botResponse = 'Para votar, haz clic en el botón "Emitir Mi Voto" en la parte superior. Deberás verificar tu identidad con tu DNI y luego podrás seleccionar a tu candidato preferido.';
        } else if (inputMessage.toLowerCase().includes('candidato')) {
          botResponse = 'Tenemos candidatos para las elecciones Presidencial, Congresal y Regional. Puedes ver todos los detalles en la sección de votación con sus propuestas completas.';
        } else if (inputMessage.toLowerCase().includes('seguro')) {
          botResponse = 'Absolutamente. Usamos cifrado AES-256 y verificación blockchain. Tu voto es anónimo y tu información está completamente protegida con tecnología de nivel militar.';
        } else if (inputMessage.toLowerCase().includes('cuándo') || inputMessage.toLowerCase().includes('fecha')) {
          botResponse = 'Las elecciones Presidencial y Congresal están en curso desde el 15 de Noviembre de 2025, de 08:00 a 20:00 horas. ¡Aún estás a tiempo de votar!';
        } else if (inputMessage.toLowerCase().includes('resultados')) {
          botResponse = 'Los resultados electorales serán publicados oficialmente una vez finalizado el proceso de votación. Mantente atento a los canales oficiales.';
        } else {
          botResponse = 'Por favor, selecciona una de las opciones disponibles para poder ayudarte mejor.';
        }
      }

      setIsTyping(false);
      const updatedMessages = [...newMessages, { role: 'bot', text: botResponse }];
      setMessages(updatedMessages);
      
      setTimeout(() => {
        const helpMessage = [...updatedMessages, { 
          role: 'bot', 
          text: '¿En qué más puedo ayudarte? Selecciona una opción:' 
        }];
        setMessages(helpMessage);
        setShowQuickQuestions(true);
        setWaitingForInput(false);
      }, 1000);
    }, 1500);

    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    const newMessages = [...messages, { role: 'user', text: question }];
    setMessages(newMessages);
    setShowQuickQuestions(false);
    setWaitingForInput(false);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      
      if (question.includes('votar')) {
        botResponse = 'Para votar, haz clic en el botón "Emitir Mi Voto" en la parte superior. Deberás verificar tu identidad con tu DNI y luego podrás seleccionar a tu candidato preferido.';
      } else if (question.includes('candidatos')) {
        botResponse = 'Tenemos candidatos para las elecciones Presidencial, Congresal y Regional. Puedes ver todos los detalles en la sección de votación con sus propuestas completas.';
      } else if (question.includes('seguro')) {
        botResponse = 'Absolutamente. Usamos cifrado AES-256 y verificación blockchain. Tu voto es anónimo y tu información está completamente protegida con tecnología de nivel militar.';
      } else if (question.includes('elecciones')) {
        botResponse = 'Las elecciones Presidencial y Congresal están en curso desde el 15 de Noviembre de 2025, de 08:00 a 20:00 horas. ¡Aún estás a tiempo de votar!';
      }

      setIsTyping(false);
      const updatedMessages = [...newMessages, { role: 'bot', text: botResponse }];
      setMessages(updatedMessages);
      setWaitingForInput(true);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
      >
        <MessageCircle className="h-8 w-8 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-gray-800" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Asistente Electoral</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="text-xs text-gray-700">En línea</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-800 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f9fafb' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white rounded-br-none shadow-lg'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-md border border-gray-200">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showQuickQuestions && (
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Preguntas frecuentes:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-all duration-200 border border-gray-300 hover:border-gray-400"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm text-gray-800 placeholder:text-gray-400 bg-white"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-700 hover:via-red-600 hover:to-rose-700 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Seguridad Militar",
      description: "Cifrado AES-256 y verificación blockchain para máxima seguridad",
      gradient: "from-blue-600 to-blue-800"
    },
    {
      icon: BarChart3,
      title: "Transparencia Total", 
      description: "Auditoría en tiempo real y resultados verificables públicamente",
      gradient: "from-green-600 to-green-800"
    },
    {
      icon: Users,
      title: "Acceso Universal",
      description: "Plataforma accesible para todos los ciudadanos habilitados", 
      gradient: "from-purple-600 to-purple-800"
    }
  ];

  const elections = [
    {
      title: "Elección Presidencial 2025",
      status: "active",
      description: "Elección del Presidente de la República",
      start: "15 Nov 2025 - 08:00", 
      end: "15 Nov 2025 - 20:00",
      candidates: 4,
      progress: 65
    },
    {
      title: "Elección Congresal",
      status: "active",
      description: "Elección de Representantes al Congreso", 
      start: "15 Nov 2025 - 08:00",
      end: "15 Nov 2025 - 20:00",
      candidates: 120,
      progress: 42
    },
    {
      title: "Elección Regional", 
      status: "completed",
      description: "Elección de Gobernadores Regionales",
      start: "10 Oct 2025 - 08:00",
      end: "10 Oct 2025 - 20:00",
      candidates: 25,
      progress: 100
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-100 via-white to-gray-100 border-b border-gray-200">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 backdrop-blur-sm border border-gray-300 shadow-md">
              <Calendar className="h-5 w-5 text-gray-700" />
              <span className="text-gray-800 font-semibold">Proceso Electoral 2025 - En Curso</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sistema Electoral
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 mt-2">
                Nacional
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Plataforma oficial de votación digital del Estado. 
              <strong className="text-gray-900"> Seguro</strong>. 
              <strong className="text-gray-900"> Transparente</strong>. 
              <strong className="text-gray-900"> Verificable</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                onClick={() => navigate("/votar")}
                className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white hover:from-red-700 hover:via-red-600 hover:to-rose-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
              >
                <Vote className="mr-3 h-6 w-6" />
                Emitir Mi Voto
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white backdrop-blur-sm border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group hover:scale-105 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Elections Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-gray-50 to-white border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Procesos Electorales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Participa en las elecciones nacionales y regionales
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {elections.map((election, index) => (
              <Card key={index} className={`border-2 ${
                election.status === 'active' 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-gray-300 bg-gray-50'
              } backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl h-full`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 text-xl">{election.title}</CardTitle>
                    <Badge className={
                      election.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-400 text-white'
                    }>
                      {election.status === 'active' ? 'En Curso' : 'Finalizado'}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    {election.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span className="font-medium">Inicio:</span>
                      <span>{election.start}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-medium">Cierre:</span>
                      <span>{election.end}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-medium">Candidatos:</span>
                      <span>{election.candidates}</span>
                    </div>
                  </div>
                  
                  {election.status === 'active' && (
                    <div className="pt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progreso de Votación</span>
                        <span className="font-semibold">{election.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${election.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-3xl p-12 shadow-2xl border-2 border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¡Tu Voto Es Tu Voz!
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Participa en la construcción democrática de nuestro país. 
              Cada voto cuenta en la toma de decisiones nacional.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/votar")}
              className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white hover:from-red-700 hover:via-red-600 hover:to-rose-700 px-12 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
            >
              <Vote className="mr-3 h-6 w-6" />
              Ir a la Cabina de Votación
            </Button>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
}
