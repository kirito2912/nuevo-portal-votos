import DataTable from './DataTable';

export default function ProcessingTab() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Procesamiento de Datos</h3>
        <p className="text-gray-400">Gestión y verificación de votantes registrados</p>
      </div>

      <DataTable />
    </div>
  );
}
