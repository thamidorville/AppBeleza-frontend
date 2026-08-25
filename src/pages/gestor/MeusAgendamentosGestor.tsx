import { useEffect, useState } from 'react';
import { listarMeusAgendamentosGestor } from '../../services/agendamentoService';
import type { Agendamento } from '../../types/agendamento';

function MeusAgendamentosGestor() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarMeusAgendamentosGestor();
        setAgendamentos(dados);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function estiloStatus(status: string): React.CSSProperties {
    if (status === 'Confirmado') return styles.statusConfirmado;
    if (status === 'Cancelado') return styles.statusCancelado;
    return styles.statusConcluido;
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Agendamentos</h1>

      {agendamentos.length === 0 ? (
        <p style={styles.vazio}>Nenhum agendamento recebido ainda.</p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Data</th>
              <th style={styles.th}>Horário</th>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Serviço</th>
              <th style={styles.th}>Funcionário</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((a) => (
              <tr key={a.id}>
                <td style={styles.td}>{a.data}</td>
                <td style={styles.td}>{a.horarioInicio} - {a.horarioFim}</td>
                <td style={styles.td}>{a.clienteNome}</td>
                <td style={styles.td}>{a.servicoNome}</td>
                <td style={styles.td}>{a.funcionarioNome || 'Próprio'}</td>
                <td style={styles.td}>
                  <span style={estiloStatus(a.status)}>{a.status}</span>
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
    marginTop: '24px',
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
  statusConfirmado: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  statusCancelado: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  statusConcluido: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: '13px',
  },
};

export default MeusAgendamentosGestor;
