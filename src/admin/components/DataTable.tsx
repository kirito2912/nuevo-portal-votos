import { useState } from 'react';
import { Search, Download } from 'lucide-react';

interface VoterData {
  id: number;
  name: string;
  dni: string;
  email: string;
  status: string;
}

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const data: VoterData[] = [
    { id: 1, name: 'Juan Pérez', dni: '12345678', email: 'juan@email.com', status: 'Verificado' },
    { id: 2, name: 'María López', dni: '23456789', email: 'maria@email.com', status: 'Verificado' },
    { id: 3, name: 'Carlos Ruiz', dni: '34567890', email: 'carlos@email.com', status: 'Pendiente' },
    { id: 4, name: 'Ana Torres', dni: '45678901', email: 'ana@email.com', status: 'Verificado' },
    { id: 5, name: 'Luis García', dni: '56789012', email: 'luis@email.com', status: 'Verificado' },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dni.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    alert('Exportando datos a CSV...');
  };

  return (
    <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Datos de Votantes</h3>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Download size={18} />
          Exportar CSV
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Nombre</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">DNI</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-dark-hover">
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.dni}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Verificado'
                        ? 'bg-green-600 text-white'
                        : 'bg-yellow-600 text-white'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
