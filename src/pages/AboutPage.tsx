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
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2332 100%)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <InfoIcon className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Acerca del Sistema
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Sistema Electoral Digital Transparente y Seguro
          </p>
        </div>

        {/* Misión - Card grande */}
        <div className="mb-6 rounded-lg p-8 border border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
          <div className="flex items-start gap-4">
            <LayoutIcon className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Nuestra Misión</h2>
              <p className="text-gray-300 leading-relaxed">
                Facilitar el proceso electoral mediante una plataforma digital moderna, segura y accesible para todos los ciudadanos. Nuestro objetivo es garantizar la transparencia, integridad y confidencialidad de cada voto, fortaleciendo así la democracia y la participación ciudadana.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Seguridad Máxima */}
          <div className="rounded-lg p-8 border border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-start gap-4 mb-6">
              <ShieldIcon className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-white">Seguridad Máxima</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Implementamos encriptación de extremo a extremo y múltiples capas de seguridad para proteger la integridad de cada voto.
            </p>
          </div>

          {/* Privacidad Garantizada */}
          <div className="rounded-lg p-8 border border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-start gap-4 mb-6">
              <FaLock className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-white">Privacidad Garantizada</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Tu voto es completamente anónimo. Nadie puede rastrear ni identificar tu elección individual.
            </p>
          </div>
        </div>

        {/* Segunda fila de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transparencia Total */}
          <div className="rounded-lg p-8 border border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-start gap-4 mb-6">
              <ChartIcon className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-white">Transparencia Total</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Resultados en tiempo real disponibles públicamente. Cada voto es verificable sin comprometer el anonimato.
            </p>
          </div>

          {/* Fácil de Usar */}
          <div className="rounded-lg p-8 border border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-start gap-4 mb-6">
              <CheckCircleIcon className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-white">Fácil de Usar</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Interfaz intuitiva y accesible diseñada para que cualquier ciudadano pueda votar sin dificultad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}