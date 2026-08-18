import { useEffect, useState } from 'react';
import { listarMinhaAgenda } from '../../services/agendaService';
import ModalNovaAgenda from '../../components/gestor/ModalNovaAgenda';
import type { Agenda } from '../../types/agenda';

function AgendaPage() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  async function carregar() {
    try {
      const dados = await listarMinhaAgenda();
      console.log('Agendas recebidas:', dados);
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
    carregar();
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div style={styles.header}>
        <h1>Agenda</h1>
        <button onClick={() => setModalAberto(true)} style={styles.botaoNovo}>
          + Novo Horário
        </button>
      </div>

      <ModalNovaAgenda
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvar}
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
                  <span style={a.disponivel ? styles.disponivel : styles.ocupado}>
                    {a.disponivel ? 'Disponível' : 'Ocupado'}
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
  disponivel: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  ocupado: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: '13px',
  },
};

export default AgendaPage;
