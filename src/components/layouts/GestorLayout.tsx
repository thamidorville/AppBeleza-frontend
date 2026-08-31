import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';

function GestorLayout() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const dados = getTokenData(token);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Belagora</h2>
        <p style={styles.nomeUsuario}>{dados?.nome}</p>
        <nav style={styles.nav}>
          <NavLink to="/dashboard" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Dashboard
          </NavLink>
          <NavLink to="/funcionarios" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Funcionários
          </NavLink>
          <NavLink to="/servicos" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Serviços
          </NavLink>
          <NavLink to="/agenda" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Agenda
          </NavLink>
          <NavLink to="/agendamentos" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Agendamentos
          </NavLink>
          <NavLink to="/meus-dados" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Meus Dados
          </NavLink>
          <NavLink to="/alterar-senha" style={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
            Alterar Senha
          </NavLink>
        </nav>
        <button onClick={handleLogout} style={styles.botaoLogout}>
          Sair
        </button>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1f2937',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '4px',
    paddingLeft: '8px',
  },
  nomeUsuario: {
    color: '#9ca3af',
    fontSize: '13px',
    paddingLeft: '8px',
    marginBottom: '32px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  link: {
    color: '#9ca3af',
    textDecoration: 'none',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '14px',
  },
  linkAtivo: {
    color: '#fff',
    textDecoration: 'none',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#7c3aed',
  },
  botaoLogout: {
    marginTop: 'auto',
    padding: '12px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#9ca3af',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    padding: '32px',
  },
};

export default GestorLayout;
