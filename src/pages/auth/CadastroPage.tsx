import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await api.post('/auth/cadastro/cliente', {
        nome,
        email,
        senha,
        telefone,
      });
      setSucesso(true);
    } catch {
      setErro('Erro ao cadastrar. Verifique os dados e tente novamente.');
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
        {sucesso ? (
          <div style={styles.card}>
            <h1 style={styles.titulo}>Tudo certo!</h1>
            <p style={styles.mensagemSucesso}>Cadastro realizado com sucesso!</p>
            <Link to="/login" style={styles.botaoLink}>Retornar para login</Link>
          </div>
        ) : (
          <div style={styles.card}>
            <h1 style={styles.titulo}>Crie sua conta</h1>
            <p style={styles.subtitulo}>Agende serviços de beleza perto de você</p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.input}
                required
              />
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
              <input
                type="tel"
                placeholder="Telefone (opcional)"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                style={styles.input}
              />

              {erro && <p style={styles.erro}>{erro}</p>}

              <button type="submit" style={styles.botao} disabled={carregando}>
                {carregando ? 'Salvando...' : 'Criar conta'}
              </button>
            </form>

            <p style={styles.linkTexto}>
              Já tem uma conta?{' '}
              <Link to="/login" style={styles.link}>Entrar</Link>
            </p>
          </div>
        )}
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
    gap: '14px',
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
  mensagemSucesso: {
    color: '#16a34a',
    fontSize: '18px',
    marginBottom: '24px',
    marginTop: '16px',
  },
  botaoLink: {
    display: 'block',
    textAlign: 'center',
    padding: '14px',
    borderRadius: '8px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
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

export default CadastroPage;
