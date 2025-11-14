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
          botResponse = 'Puedes ver los resultados en tiempo real haciendo clic en "Ver Resultados en Tiempo Real". Los datos se actualizan constantemente durante el proceso electoral.';
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
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
      >
        <MessageCircle className="h-8 w-8 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-700">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Asistente Electoral</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <p className="text-xs text-blue-100">En línea</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4b5563 #1f2937' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none shadow-lg'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none shadow-md border border-gray-600'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-md border border-gray-600">
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
        <div className="px-4 py-3 bg-gray-900 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2 font-semibold">Preguntas frecuentes:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-full transition-all duration-200 border border-gray-600 hover:border-blue-400"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-100 placeholder:text-gray-500 bg-gray-800"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-blue-900/90 border-b border-blue-700/50">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Calendar className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Proceso Electoral 2025 - En Curso</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sistema Electoral
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mt-2">
                Nacional
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Plataforma oficial de votación digital del Estado. 
              <strong className="text-white"> Seguro</strong>. 
              <strong className="text-white"> Transparente</strong>. 
              <strong className="text-white"> Verificable</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                onClick={() => navigate("/votar")}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <Vote className="mr-3 h-6 w-6" />
                Emitir Mi Voto
              </Button>
              <Button 
                size="lg" 
                onClick={() => navigate("/resultados")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="mr-3 h-6 w-6" />
                Ver Resultados en Tiempo Real
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/60 backdrop-blur-sm border-gray-700 hover:bg-gray-800/80 transition-all duration-300 group hover:scale-105 h-full">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Elections Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-800/30 backdrop-blur-sm border-t border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Procesos Electorales
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Participa en las elecciones nacionales y regionales
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {elections.map((election, index) => (
              <Card key={index} className={`border-2 ${
                election.status === 'active' 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-gray-500/50 bg-gray-500/10'
              } backdrop-blur-sm transition-all duration-300 hover:scale-105 h-full`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl">{election.title}</CardTitle>
                    <Badge className={
                      election.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }>
                      {election.status === 'active' ? 'En Curso' : 'Finalizado'}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 text-base">
                    {election.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-white">
                      <span className="font-medium">Inicio:</span>
                      <span>{election.start}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="font-medium">Cierre:</span>
                      <span>{election.end}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="font-medium">Candidatos:</span>
                      <span>{election.candidates}</span>
                    </div>
                  </div>
                  
                  {election.status === 'active' && (
                    <div className="pt-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Progreso de Votación</span>
                        <span className="font-semibold">{election.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¡Tu Voto Es Tu Voz!
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Participa en la construcción democrática de nuestro país. 
              Cada voto cuenta en la toma de decisiones nacional.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/votar")}
              className="bg-white text-blue-900 hover:bg-blue-50 px-12 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
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