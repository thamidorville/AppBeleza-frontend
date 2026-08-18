import { useState } from 'react';
import { criarFuncionario } from '../../services/funcionarioService';

interface ModalNovoFuncionarioProps {
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: () => void;
}

function ModalNovoFuncionario({ aberto, aoFechar, aoSalvar }: ModalNovoFuncionarioProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (!aberto) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await criarFuncionario({ nome, email, senha, telefone });
      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      aoSalvar();
    } catch {
      setErro('Erro ao cadastrar funcionário. Verifique os dados.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.overlay} onClick={aoFechar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.titulo}>Novo Funcionário</h2>

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
            placeholder="Senha inicial"
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

          <div style={styles.botoes}>
            <button type="button" onClick={aoFechar} style={styles.botaoCancelar}>
              Cancelar
            </button>
            <button type="submit" style={styles.botaoSalvar} disabled={carregando}>
              {carregando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '32px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  titulo: {
    marginBottom: '24px',
    color: '#1f2937',
    fontSize: '20px',
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
  erro: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
  },
  botoes: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  botaoCancelar: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
  },
  botaoSalvar: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default ModalNovoFuncionario;
