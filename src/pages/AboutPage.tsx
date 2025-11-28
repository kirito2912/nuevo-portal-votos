// Iconos SVG en línea para evitar el error de importación

function FaLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
      <path d="M400 224h-24v-72C376 68.5 307.5 0 224 0S72 68.5 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-272-72c0-57.3 46.7-104 104-104s104 46.7 104 104v72H128v-72zm272 312c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v192zm-176-80c-22.1 0-40-17.9-40-40 0-15.5 8.9-29.1 23-36.1V336c0-13.3 10.7-24 24-24s24 10.7 24 24v7.9c14.1 7 23 20.6 23 36.1 0 22.1-17.9 40-40 40z" />
    </svg>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17v-6M8 17v-3" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md">
              <InfoIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Acerca del Sistema
            </h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">
            Sistema Electoral Digital Transparente y Seguro
          </p>
        </div>

        {/* Misión - Card grande */}
        <div className="mb-4 sm:mb-6 rounded-xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 bg-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <LayoutIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Nuestra Misión</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Facilitar el proceso electoral mediante una plataforma digital moderna, segura y accesible para todos los ciudadanos. Nuestro objetivo es garantizar la transparencia, integridad y confidencialidad de cada voto, fortaleciendo así la democracia y la participación ciudadana.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Seguridad Máxima */}
          <div className="rounded-xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <ShieldIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Seguridad Máxima</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Implementamos encriptación de extremo a extremo y múltiples capas de seguridad para proteger la integridad de cada voto.
            </p>
          </div>

          {/* Privacidad Garantizada */}
          <div className="rounded-xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <FaLock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Privacidad Garantizada</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Tu voto es completamente anónimo. Nadie puede rastrear ni identificar tu elección individual.
            </p>
          </div>
        </div>

        {/* Segunda fila de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Transparencia Total */}
          <div className="rounded-xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <ChartIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Transparencia Total</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Resultados en tiempo real disponibles públicamente. Cada voto es verificable sin comprometer el anonimato.
            </p>
          </div>

          {/* Fácil de Usar */}
          <div className="rounded-xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Fácil de Usar</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Interfaz intuitiva y accesible diseñada para que cualquier ciudadano pueda votar sin dificultad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}