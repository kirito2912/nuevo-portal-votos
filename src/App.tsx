import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './admin/pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Usuario con Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="votar" element={<VotePage />} />
          <Route path="resultados" element={<ResultsPage />} />
          <Route path="acerca-de" element={<AboutPage />} />
        </Route>

        {/* Ruta de Admin Login sin Layout */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Ruta de Admin Dashboard con AdminLayout */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
