import { useEffect, useState } from 'react';
import { listarMinhaAgenda, deletarAgenda } from '../../services/agendaService';
import ModalNovaAgenda from '../../components/gestor/ModalNovaAgenda';
import ModalGenerico from '../../components/shared/ModalGenerico';
import type { Agenda } from '../../types/agenda';

function AgendaPage() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [agendaParaEditar, setAgendaParaEditar] = useState<Agenda | null>(null);
  const [modalRemoverAberto, setModalRemoverAberto] = useState(false);
  const [agendaParaRemover, setAgendaParaRemover] = useState<Agenda | null>(null);

  async function carregar() {
    try {
      const dados = await listarMinhaAgenda();
      setAgendas(dados);
    } catch (error) {
      console.error('Erro ao carregar agenda:', error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function handleSalvar() {
    setModalAberto(false);
    setAgendaParaEditar(null);
    carregar();
  }

  function abrirNovo() {
    setAgendaParaEditar(null);
    setModalAberto(true);
  }

  function abrirEdicao(agenda: Agenda) {
    setAgendaParaEditar(agenda);
    setModalAberto(true);
  }

  function handleRemover(agenda: Agenda) {
    setAgendaParaRemover(agenda);
    setModalRemoverAberto(true);
  }

  async function confirmarRemocao() {
    if (!agendaParaRemover) return;

    try {
      await deletarAgenda(agendaParaRemover.id);
      carregar();
    } catch (error) {
      console.error('Erro ao remover agenda:', error);
      alert('Não foi possível remover. Verifique se há agendamento ativo neste horário.');
    } finally {
      setModalRemoverAberto(false);
      setAgendaParaRemover(null);
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div style={styles.header}>
        <h1>Agenda</h1>
        <button onClick={abrirNovo} style={styles.botaoNovo}>
          + Novo Horário
        </button>
      </div>

      <ModalNovaAgenda
        aberto={modalAberto}
        aoFechar={() => { setModalAberto(false); setAgendaParaEditar(null); }}
        aoSalvar={handleSalvar}
        agendaParaEditar={agendaParaEditar}
      />

      {agendas.length === 0 ? (
        <p style={styles.vazio}>Nenhum horário publicado ainda.</p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Data</th>
              <th style={styles.th}>Horário</th>
              <th style={styles.th}>Funcionário</th>
              <th style={styles.th}>Serviço</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendas.map((a) => (
              <tr key={a.id}>
                <td style={styles.td}>{a.dataAgendamento}</td>
                <td style={styles.td}>{a.horaInicio} - {a.horaFim}</td>
                <td style={styles.td}>{a.funcionarioNome || 'Próprio'}</td>
                <td style={styles.td}>{a.servicoNome}</td>
                <td style={styles.td}>
                  <span style={a.status === 'Disponivel' ? styles.disponivel : a.status === 'Cancelado' ? styles.cancelado : styles.ocupado}>
                    {a.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.acoes}>
                    <button onClick={() => abrirEdicao(a)} style={styles.botaoEditar}>
                      Editar
                    </button>
                    <button onClick={() => handleRemover(a)} style={styles.botaoRemover}>
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalGenerico
        aberto={modalRemoverAberto}
        titulo="Remover horário"
        mensagem="Tem certeza que deseja remover este horário da agenda?"
        textoBotaoConfirmar="Remover"
        aoConfirmar={confirmarRemocao}
        aoFechar={() => { setModalRemoverAberto(false); setAgendaParaRemover(null); }}
      />
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
  disponivel: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  ocupado: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  cancelado: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  acoes: {
    display: 'flex',
    gap: '8px',
  },
  botaoEditar: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #7c3aed',
    backgroundColor: '#fff',
    color: '#7c3aed',
    fontSize: '13px',
    cursor: 'pointer',
  },
  botaoRemover: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #dc2626',
    backgroundColor: '#fff',
    color: '#dc2626',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default AgendaPage;
