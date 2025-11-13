export default function AboutPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Acerca del Sistema Electoral</h1>

      <div className="max-w-4xl space-y-6">
        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-300 leading-relaxed">
            Garantizar procesos electorales transparentes, seguros y accesibles para todos los ciudadanos,
            fortaleciendo la democracia mediante el uso de tecnología de vanguardia.
          </p>
        </div>

        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Seguridad y Privacidad</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Nuestro sistema utiliza encriptación de extremo a extremo y tecnología blockchain para
            garantizar la integridad de cada voto. La identidad de los votantes está protegida mediante
            protocolos de anonimización avanzados.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Encriptación AES-256</li>
            <li>Autenticación multifactor</li>
            <li>Auditoría completa del proceso</li>
            <li>Cumplimiento con estándares internacionales</li>
          </ul>
        </div>

        <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
          <p className="text-gray-300">
            Para consultas o soporte técnico, contáctanos en:
          </p>
          <p className="text-blue-400 mt-2">soporte@sistemaelectoral.gob</p>
        </div>
      </div>
    </div>
  );
}
