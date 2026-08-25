import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alterarSenha } from '../../services/authService';

function AlterarSenhaPage() {
  const navigate = useNavigate();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (novaSenha !== confirmarSenha) {
      setErro('A nova senha e a confirmação não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      await alterarSenha(senhaAtual, novaSenha);
      setSucesso('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } catch {
      setErro('Erro ao alterar senha. Verifique a senha atual.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.pagina}>
      <div style={styles.container}>
        <button type="button" onClick={() => navigate(-1)} style={styles.botaoVoltar}>
          ← Voltar
        </button>
        <h1 style={styles.titulo}>Alterar Senha</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="Senha atual"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          style={styles.input}
          required
        />

        {erro && <p style={styles.erro}>{erro}</p>}
        {sucesso && <p style={styles.sucesso}>{sucesso}</p>}

          <button type="submit" style={styles.botao} disabled={carregando}>
            {carregando ? 'Salvando...' : 'Alterar Senha'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pagina: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
  },
  container: {
    width: '100%',
    maxWidth: '420px',
  },
  botaoVoltar: {
    background: 'none',
    border: 'none',
    color: '#7c3aed',
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
    marginBottom: '16px',
  },
  titulo: {
    marginBottom: '24px',
    color: '#1f2937',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  erro: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
  },
  sucesso: {
    color: '#16a34a',
    fontSize: '14px',
    textAlign: 'center',
  },
  botao: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
};

export default AlterarSenhaPage;
