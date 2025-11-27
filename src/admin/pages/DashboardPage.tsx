import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ResultsTab from '../components/ResultsTab';
import ProcessingTab from '../components/ProcessingTab';
import TrainingTab from '../components/TrainingTab';
import AnalysisTab from '../components/AnalysisTab';
import { Shield, Sparkles, BarChart3, Database, Brain, TrendingUp } from 'lucide-react';
import '../../styles/admin/index.css';

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'overview';
  const [activeTab, setActiveTab] = useState<'overview'|'resultados'|'procesamiento'|'entrenamiento'|'analisis'|'reportes'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<'presidencial' | 'regional' | 'distrital'>('presidencial');

  useEffect(() => {
    const tab = (searchParams.get('tab') as any) || 'overview';
    const section = searchParams.get('section') || '';
    setActiveTab(tab);
    if (tab === 'resultados') {
      if (section === 'presidencial') setSelectedCategory('presidencial');
      if (section === 'regional') setSelectedCategory('regional');
      if (section === 'distrital') setSelectedCategory('distrital');
    }
  }, [searchParams]);

  const metrics = [
    {
      value: '1,247',
      label: 'Total de Votos',
      icon: BarChart3,
      iconColor: '#d4af37',
      badge: { text: '+12%', color: '#10b981' }
    },
    {
      value: '98.2%',
      label: 'Precisión de Datos',
      icon: Database,
      iconColor: '#10b981',
      badge: { text: 'Activo', color: '#3b82f6' }
    },
    {
      value: '94.5%',
      label: 'Exactitud del Modelo',
      icon: Brain,
      iconColor: '#8b5cf6',
      badge: { text: 'ML', color: '#8b5cf6' }
    },
    {
      value: '8',
      label: 'Candidatos Activos',
      icon: TrendingUp,
      iconColor: '#f59e0b',
      badge: { text: 'Live', color: '#f59e0b' }
    },
  ];

  return (
    <AdminLayout>
      {/* Título Principal */}
      <div className="dashboard-main-title">
        <Shield size={32} className="text-blue-400" />
        <h1>Sistema Electoral Nacional</h1>
        <Sparkles size={32} className="text-yellow-400" />
      </div>
      <p className="dashboard-subtitle">
        Plataforma Avanzada de Gestión y Análisis Electoral
      </p>

      {activeTab === 'overview' && (
        <div className="dashboard-metrics-grid">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="dashboard-metric-card">
                <div 
                  className="dashboard-metric-icon"
                  style={{ backgroundColor: `${metric.iconColor}20`, color: metric.iconColor }}
                >
                  <Icon size={24} />
                </div>
                <div className="dashboard-metric-value">{metric.value}</div>
                <div className="dashboard-metric-label">{metric.label}</div>
                <div 
                  className="dashboard-metric-badge"
                  style={{ 
                    backgroundColor: `${metric.badge.color}20`, 
                    color: metric.badge.color 
                  }}
                >
                  {metric.badge.text}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700 mt-6">
          <div className="flex flex-wrap gap-3 items-center">
            <input type="file" accept=".csv" onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              const text = await f.text()
              const lines = text.split(/\r?\n/).filter(Boolean)
              if (lines.length <= 1) return
              const header = lines[0].split(',').map(s => s.trim().toLowerCase())
              const idx = {
                category: header.indexOf('category'),
                name: header.indexOf('name'),
                party: header.indexOf('party'),
                photo: header.indexOf('photo'),
                description: header.indexOf('description'),
                education: header.indexOf('education'),
                experience: header.indexOf('experience'),
                proposals: header.indexOf('proposals'),
              }
              const buckets: Record<'presidencial'|'regional'|'distrital', any[]> = {
                presidencial: [], regional: [], distrital: []
              }
              for (const line of lines.slice(1)) {
                const cols = line.split(',')
                const cat = (cols[idx.category] || '').trim().toLowerCase() as 'presidencial'|'regional'|'distrital'
                if (!['presidencial','regional','distrital'].includes(cat)) continue
                const item = {
                  id: Date.now() + Math.floor(Math.random()*100000),
                  name: (cols[idx.name] || '').trim(),
                  party: (cols[idx.party] || '').trim(),
                  photo: (cols[idx.photo] || '').trim(),
                  description: (cols[idx.description] || '').trim(),
                  education: (cols[idx.education] || '').trim(),
                  experience: (cols[idx.experience] || '').trim(),
                  proposals: idx.proposals >= 0 ? (cols[idx.proposals] || '').split(';').map(s => s.trim()).filter(Boolean) : []
                }
                buckets[cat].push(item)
              }
              const { saveCandidates } = await import('@/services/dataStore')
              saveCandidates('presidencial', buckets.presidencial)
              saveCandidates('regional', buckets.regional)
              saveCandidates('distrital', buckets.distrital)
              e.currentTarget.value = ''
            }}/>
            <button className="dashboard-nav-item" onClick={async () => {
              const { loadCandidates } = await import('@/services/dataStore')
              const buildCsv = (cat: 'presidencial'|'regional'|'distrital') => {
                const list = loadCandidates(cat)
                const rows = [['category','name','party','photo','description','education','experience','proposals']]
                for (const c of list) rows.push([cat, c.name, c.party, c.photo, c.description, c.education, c.experience, (c.proposals||[]).join(';')])
                return rows.map(r => r.map(v => String(v).replace(/,/g, ' ')).join(',')).join('\n')
              }
              const payload = buildCsv('presidencial') + '\n' + buildCsv('regional') + '\n' + buildCsv('distrital')
              const blob = new Blob([payload], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'candidatos.csv'
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }}>Exportar CSV</button>
            <button className="dashboard-nav-item" onClick={async () => {
              const { loadCandidates } = await import('@/services/dataStore')
              const data = {
                presidencial: loadCandidates('presidencial'),
                regional: loadCandidates('regional'),
                distrital: loadCandidates('distrital')
              }
              const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'candidatos.json'
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }}>Exportar JSON</button>
          </div>
        </div>
      )}

      <div>
        {activeTab === 'resultados' && <ResultsTab selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />}
        {activeTab === 'procesamiento' && <ProcessingTab />}
        {activeTab === 'entrenamiento' && <TrainingTab />}
        {activeTab === 'analisis' && <AnalysisTab selectedCategory={selectedCategory} />}
      </div>
    </AdminLayout>
  );
}
