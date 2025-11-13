import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ResultsTab from '../components/ResultsTab';
import ProcessingTab from '../components/ProcessingTab';
import AnalysisTab from '../components/AnalysisTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('resultados');

  const tabs = [
    { id: 'resultados', label: 'Resultados' },
    { id: 'procesamiento', label: 'Procesamiento' },
    { id: 'entrenamiento', label: 'Entrenamiento' },
    { id: 'analisis', label: 'Análisis' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard Electoral</h2>

        <div className="flex gap-2 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'resultados' && <ResultsTab />}
        {activeTab === 'procesamiento' && <ProcessingTab />}
        {activeTab === 'entrenamiento' && (
          <div className="bg-dark-card rounded-lg p-8 border border-gray-700 text-center">
            <h3 className="text-xl font-semibold mb-2">Módulo de Entrenamiento</h3>
            <p className="text-gray-400">Funcionalidad en desarrollo</p>
          </div>
        )}
        {activeTab === 'analisis' && <AnalysisTab />}
      </div>
    </AdminLayout>
  );
}
