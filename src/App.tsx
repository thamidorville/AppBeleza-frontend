import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import LoginPage from './pages/auth/LoginPage';
import CadastroPage from './pages/auth/CadastroPage';
import ParaProfissionaisPage from './pages/auth/ParaProfissionaisPage';
import DashboardPage from './pages/gestor/DashboardPage';
import FuncionariosPage from './pages/gestor/FuncionariosPage';
import ServicosPage from './pages/gestor/ServicosPage';
import AgendaPage from './pages/gestor/AgendaPage';
import MeusAgendamentosGestor from './pages/gestor/MeusAgendamentosGestor';
import FuncionarioAgendaPage from './pages/funcionario/AgendaPage';
import BuscarPage from './pages/cliente/BuscarPage';
import MeusAgendamentosPage from './pages/cliente/MeusAgendamentosPage';
import PainelPage from './pages/admin/PainelPage';
import UsuariosPage from './pages/admin/UsuariosPage';
import ClientesPage from './pages/admin/ClientesPage';
import AlterarSenhaPage from './pages/shared/AlterarSenhaPage';
import MeusDadosPage from './pages/shared/MeusDadosPage';

import GestorLayout from './components/layouts/GestorLayout';
import FuncionarioLayout from './components/layouts/FuncionarioLayout';
import ClienteLayout from './components/layouts/ClienteLayout';
import AdminLayout from './components/layouts/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/para-profissionais" element={<ParaProfissionaisPage />} />
          <Route path="/" element={<LoginPage />} />

          <Route element={<PrivateRoute allowedRoles={['Gestor']} />}>
            <Route element={<GestorLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/funcionarios" element={<FuncionariosPage />} />
              <Route path="/servicos" element={<ServicosPage />} />
              <Route path="/agenda" element={<AgendaPage />} />
              <Route path="/agendamentos" element={<MeusAgendamentosGestor />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Funcionario']} />}>
            <Route element={<FuncionarioLayout />}>
              <Route path="/minha-agenda" element={<FuncionarioAgendaPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Cliente']} />}>
            <Route element={<ClienteLayout />}>
              <Route path="/buscar" element={<BuscarPage />} />
              <Route path="/meus-agendamentos" element={<MeusAgendamentosPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<PainelPage />} />
              <Route path="/admin/usuarios" element={<UsuariosPage />} />
              <Route path="/admin/clientes" element={<ClientesPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/alterar-senha" element={<AlterarSenhaPage />} />
            <Route path="/meus-dados" element={<MeusDadosPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
