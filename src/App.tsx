import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import LoginPage from './pages/auth/LoginPage';
import CadastroPage from './pages/auth/CadastroPage';
import DashboardPage from './pages/gestor/DashboardPage';
import FuncionariosPage from './pages/gestor/FuncionariosPage';
import ServicosPage from './pages/gestor/ServicosPage';
import AgendaPage from './pages/funcionario/AgendaPage';
import BuscarPage from './pages/cliente/BuscarPage';
import PainelPage from './pages/admin/PainelPage';

import GestorLayout from './components/GestorLayout';
import FuncionarioLayout from './components/FuncionarioLayout';
import ClienteLayout from './components/ClienteLayout';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/" element={<LoginPage />} />

          {/* Rotas do Gestor */}
          <Route element={<PrivateRoute allowedRoles={['Gestor']} />}>
            <Route element={<GestorLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/funcionarios" element={<FuncionariosPage />} />
              <Route path="/servicos" element={<ServicosPage />} />
            </Route>
          </Route>

          {/* Rotas do Funcionário */}
          <Route element={<PrivateRoute allowedRoles={['Funcionario']} />}>
            <Route element={<FuncionarioLayout />}>
              <Route path="/minha-agenda" element={<AgendaPage />} />
            </Route>
          </Route>

          {/* Rotas do Cliente */}
          <Route element={<PrivateRoute allowedRoles={['Cliente']} />}>
            <Route element={<ClienteLayout />}>
              <Route path="/buscar" element={<BuscarPage />} />
            </Route>
          </Route>

          {/* Rotas do Admin */}
          <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<PainelPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
