import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await api.post('/auth/login', { email, senha });
      const token = response.data.token;

      login(token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload['role'] || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (role === 'Gestor') navigate('/dashboard');
      else if (role === 'Admin') navigate('/admin');
      else if (role === 'Funcionario') navigate('/minha-agenda');
      else if (role === 'Cliente') navigate('/buscar');
      else navigate('/dashboard');
    } catch {
      setErro('Email ou senha inválidos.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.imagemLado}>
        <div style={styles.overlay} />
        <div style={styles.imagemTexto}>
          <h2 style={styles.imagemTitulo}>Belagora</h2>
          <p style={styles.imagemDescricao}>
            Abriu, achou, agendou.
          </p>
        </div>
      </div>

      <div style={styles.formLado}>
        <div style={styles.card}>
          <h1 style={styles.titulo}>Acesse sua conta</h1>
          <p style={styles.subtitulo}>Entre com seu email e senha</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={styles.input}
              required
            />

            {erro && <p style={styles.erro}>{erro}</p>}

            <button type="submit" style={styles.botao} disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p style={styles.linkTexto}>
            É cliente?{' '}
            <Link to="/cadastro" style={styles.link}>Crie sua conta</Link>
          </p>
          <p style={styles.linkTexto}>
            É profissional?{' '}
            <Link to="/para-profissionais" style={styles.link}>Conheça nossos planos</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  imagemLado: {
    flex: 1,
    position: 'relative',
    backgroundImage: 'url(/lavando-cabelo.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(124, 58, 237, 0.5)',
    backdropFilter: 'blur(3px)',
  },
  imagemTexto: {
    position: 'relative',
    zIndex: 1,
    color: '#fff',
    textAlign: 'center',
  },
  imagemTitulo: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '12px',
    letterSpacing: '-1px',
  },
  imagemDescricao: {
    fontSize: '20px',
    opacity: 0.95,
    fontWeight: '300',
    letterSpacing: '0.5px',
  },
  formLado: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: '40px',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
  },
  titulo: {
    marginBottom: '8px',
    color: '#1f2937',
    fontSize: '24px',
  },
  subtitulo: {
    marginBottom: '32px',
    color: '#6b7280',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  botao: {
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  erro: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
  },
  linkTexto: {
    textAlign: 'center',
    marginTop: '24px',
    color: '#6b7280',
    fontSize: '14px',
  },
  link: {
    color: '#7c3aed',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default LoginPage;
