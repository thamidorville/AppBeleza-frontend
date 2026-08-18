import { useState } from 'react';
import { criarServico } from '../../services/servicoService';

interface ModalNovoServicoProps {
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: () => void;
}

function ModalNovoServico({ aberto, aoFechar, aoSalvar }: ModalNovoServicoProps) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracaoMinutos, setDuracaoMinutos] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (!aberto) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await criarServico({
        nome,
        descricao,
        preco: parseFloat(preco),
        duracaoMinutos: parseInt(duracaoMinutos),
      });
      setNome('');
      setDescricao('');
      setPreco('');
      setDuracaoMinutos('');
      aoSalvar();
    } catch {
      setErro('Erro ao cadastrar serviço. Verifique os dados.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.overlay} onClick={aoFechar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.titulo}>Novo Serviço</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Preço (R$)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={styles.input}
            step="0.01"
            min="0"
            required
          />
          <input
            type="number"
            placeholder="Duração (minutos)"
            value={duracaoMinutos}
            onChange={(e) => setDuracaoMinutos(e.target.value)}
            style={styles.input}
            min="1"
            required
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

export default ModalNovoServico;
