Kirito2354
kirito2354.
En canal de voz
Aquí empieza el canal Trabajo. 
Eduardo — 09/11/2025 16:55
el apartado de votar no me deja seleccionar mi distrito  solucionalo
Eduardo — 09/11/2025 17:15
https://lovable.dev/projects/31479404-6983-4f92-83a5-d63aad927367?remixed=true
Lovable - Build for the web 20x faster
Build software products, using only a chat interface.
Lovable - Build for the web 20x faster
darkai4264

 — 09/11/2025 17:59
el grafico circular serian mas principal para presidencial, ya que es nacional
darkai4264

 — 09/11/2025 19:01
tengo practica de las 8  a 3 y ya estoy libre desde las 5 para arriba, normal nos desvelamos
reu
Imagen
darkai4264

 — 09/11/2025 19:14
miercoles hasta el manual de usuario, para descansar mejor
darkai4264

 — 09/11/2025 19:37
andersonaponte720-blip
Estela — 09/11/2025 19:38
Estelaa9
waaaaaaaaaaaaaaa
xdddd
Remix

 — 09/11/2025 19:55
gianvalen47
darkai4264

 — 09/11/2025 20:24
https://github.com/andersonaponte720-blip/easy-vote-portal-65459
GitHub
GitHub - andersonaponte720-blip/easy-vote-portal-65459
Contribute to andersonaponte720-blip/easy-vote-portal-65459 development by creating an account on GitHub.
Contribute to andersonaponte720-blip/easy-vote-portal-65459 development by creating an account on GitHub.
darkai4264

 — 10/11/2025 22:55
es esto verdad: https://desktop.github.com/download/
GitHub Desktop
Download GitHub Desktop
Simple collaboration from your desktop
darkai4264

 — 11/11/2025 1:47
@Estela
Ya me voy a dormir
:c
darkai4264

 — 12/11/2025 16:13
kiro
darkai4264

 — 12/11/2025 16:25
...
andersonaponte720-blip
Eduardo — 12/11/2025 16:38
npm create vite@latest . -- --template react
darkai4264

 — 12/11/2025 16:39
https://kiro.dev/
Kiro
Kiro
Kiro is an agentic IDE that helps you go from prototype to production with spec-driven development.
Kiro
darkai4264

 — 12/11/2025 16:52
luna pasas tu promt para probarlo despues
Eduardo — 12/11/2025 17:06
Imagen
Imagen
Eduardo — 12/11/2025 17:15
ahora en ela seccion de votar quiero que salga este login de registrarse antes de ver a los candidatos, cuando nosotros ponemos nuestros datos a este login que sale , nos tiene que aparecer esta pagina donde nosotros podemos visualizar la seccion de candidatos donde hay presiencial , regional y distrtial
Imagen
Imagen
darkai4264

 — 12/11/2025 17:50
ya esta no el repo?
darkai4264

 — 12/11/2025 18:00
https://github.com/kirito2912/nuevo-portal-votos
GitHub
GitHub - kirito2912/nuevo-portal-votos
Contribute to kirito2912/nuevo-portal-votos development by creating an account on GitHub.
Contribute to kirito2912/nuevo-portal-votos development by creating an account on GitHub.
darkai4264

 — 12/11/2025 19:09
vite, typescrip, react 
darkai4264

 — 12/11/2025 19:30
si tienes de caballero pasame porfa
ese proyecto esta bueno, su vista
Eduardo — 12/11/2025 19:47
Estela
Me escuchas
darkai4264

 — 12/11/2025 19:49
se escucha bajo
darkai4264

 — 12/11/2025 20:13
@Estela estas?
@Estela estas?
@Estela
@Estela
darkai4264

 — 12/11/2025 20:23
@Eduardo
Eduardo — 12/11/2025 20:31
Aponte
Me escuchas ?
Me escuchas ?
darkai4264

 — 12/11/2025 20:37
voy a ir cenar ahora si, me escriben al grupo de wsp cualquier cosa
darkai4264

 — 12/11/2025 21:45
ya estoy
darkai4264

 — 0:52
pasa link de tu repo luna
Kirito2354 — 0:52
https://github.com/kirito2912/nuevo-portal-votos/tree/main
GitHub
GitHub - kirito2912/nuevo-portal-votos
Contribute to kirito2912/nuevo-portal-votos development by creating an account on GitHub.
Contribute to kirito2912/nuevo-portal-votos development by creating an account on GitHub.
Eduardo — 0:58
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, BarChart3, Users, Shield, Calendar, MessageCircle, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
Expandir
message.txt
20 KB
Eduardo — 1:27
LOGINPAGE
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
Expandir
message.txt
7 KB
darkai4264

 — 1:31
mi internet va mal
Estela — 1:34
se ponen integrantes
???????????????
darkai4264

 — 1:34
eso seria en la ppt nomás
@Estela nosotros lo hicimos asi nomás: https://docs.google.com/document/d/10fvPNZ31R9gcif4wzIJBR_2eJarqrJyX/edit
Google Docs
MANUAL DE USUARIO (1).docx
INGENIERIA DE SOFTWARE CON INTELIGENCIA ARTIFICIAL MANUAL DE USUARIO Manual de Usuario - Sistema Electoral ONPE Guía para Votantes Registrados Índice 1. Introducción2. Registro e Inicio de Sesión 2.1 Crear una Cuenta Nueva 2.2 Iniciar Sesión con Cuenta Existente 2.3 Cerra...
Imagen
Estela — 1:44
chicos ponganle una imagen o un icono al asistente virtual
xddddd
solo de sugerencia
darkai4264

 — 1:47
que sea una de las imagenes que mande al grupo
﻿
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@electoral.gov');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login
    setTimeout(() => {
      if (email && password) {
        navigate('/admin/dashboard');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg font-bold">Panel Administrativo</h1>
            <p className="text-gray-400 text-sm">Sistema Electoral Nacional</p>
          </div>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={18} />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Tarjeta Principal */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            
            {/* Header Simple */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-white mb-1">Acceso Seguro</h2>
              <p className="text-blue-100 text-sm">Credenciales administrativas requeridas</p>
            </div>

            {/* Formulario */}
            <div className="px-8 py-6 bg-gray-800">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-white placeholder-gray-400"
                      placeholder="admin@electoral.gov"
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Botón de Acceso */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                    text-white py-3 rounded-lg font-semibold transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verificando...' : 'Acceder al Panel'}
                </button>
              </form>

              {/* Credenciales de Demo */}
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-200 mb-2">Credenciales de Demo:</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <code className="text-blue-300">admin@electoral.gov</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Password:</span>
                    <code className="text-blue-300">Pipe123</code>
                  </div>
                </div>
              </div>

              {/* Aviso de Seguridad */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Acceso Restringido • Solo Personal Autorizado
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Todas las actividades son monitoreadas y registradas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}