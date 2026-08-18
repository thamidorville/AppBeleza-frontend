import { useEffect, useState } from 'react';
import { listarMeusServicos } from '../../services/servicoService';
import ModalNovoServico from '../../components/gestor/ModalNovoServico';
import type { Servico } from '../../types/servico';

function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  async function carregar() {
    try {
      const dados = await listarMeusServicos();
      setServicos(dados);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function handleSalvar() {
    setModalAberto(false);
    carregar();
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div style={styles.header}>
        <h1>Serviços</h1>
        <button onClick={() => setModalAberto(true)} style={styles.botaoNovo}>
          + Novo Serviço
        </button>
      </div>

      <ModalNovoServico
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvar}
      />

      {servicos.length === 0 ? (
        <p style={styles.vazio}>Nenhum serviço cadastrado ainda.</p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Duração</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>{s.nome}</td>
                <td style={styles.td}>R$ {s.preco.toFixed(2)}</td>
                <td style={styles.td}>{s.duracaoMinutos} min</td>
                <td style={styles.td}>
                  <span style={s.ativo ? styles.ativo : styles.inativo}>
                    {s.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  botaoNovo: {
    padding: '10px 20px',
    borderRadius: '6px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  vazio: {
    color: '#6b7280',
    fontSize: '16px',
  },
  tabela: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    backgroundColor: '#f9fafb',
    color: '#374151',
    fontSize: '13px',
    fontWeight: '600',
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#1f2937',
    borderBottom: '1px solid #f3f4f6',
  },
  ativo: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  inativo: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: '13px',
  },
};

export default ServicosPage;
