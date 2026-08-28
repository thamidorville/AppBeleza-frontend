import { useEffect, useState } from 'react';
import { listarMeusAgendamentosGestor, cancelarAgendamentoGestor, concluirAgendamento } from '../../services/agendamentoService';
import ModalGenerico from '../../components/shared/ModalGenerico';
import type { Agendamento } from '../../types/agendamento';

function MeusAgendamentosGestor() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const [modalConcluirAberto, setModalConcluirAberto] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<'Confirmado' | 'Concluido' | 'Cancelado'>('Confirmado');

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

  useEffect(() => {
    carregar();
  }, []);

  async function handleCancelar(id: string) {
    setIdSelecionado(id);
    setModalCancelarAberto(true);
  }

  async function confirmarCancelamento(motivo?: string) {
    if (!idSelecionado || !motivo) return;

    try {
      await cancelarAgendamentoGestor(idSelecionado, motivo);
      carregar();
    } catch (error) {
      console.error('Erro ao cancelar:', error);
      alert('Não foi possível cancelar o agendamento.');
    } finally {
      setModalCancelarAberto(false);
      setIdSelecionado(null);
    }
  }

  async function handleConcluir(id: string) {
    setIdSelecionado(id);
    setModalConcluirAberto(true);
  }

  async function confirmarConclusao() {
    if (!idSelecionado) return;

    try {
      await concluirAgendamento(idSelecionado);
      carregar();
    } catch (error) {
      console.error('Erro ao concluir:', error);
      alert('Não foi possível concluir o agendamento.');
    } finally {
      setModalConcluirAberto(false);
      setIdSelecionado(null);
    }
  }

  function estiloStatus(status: string): React.CSSProperties {
    if (status === 'Confirmado') return styles.statusConfirmado;
    if (status === 'Cancelado') return styles.statusCancelado;
    return styles.statusConcluido;
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  const abas: Array<'Confirmado' | 'Concluido' | 'Cancelado'> = ['Confirmado', 'Concluido', 'Cancelado'];
  const rotuloAba: Record<string, string> = {
    Confirmado: 'Ativos',
    Concluido: 'Concluídos',
    Cancelado: 'Cancelados',
  };
  const agendamentosFiltrados = agendamentos.filter((a) => a.status === abaAtiva);

  return (
    <div>
      <h1>Agendamentos</h1>

      <div style={styles.abas}>
        {abas.map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={abaAtiva === aba ? styles.abaAtiva : styles.aba}
          >
            {rotuloAba[aba]}
          </button>
        ))}
      </div>

      {agendamentosFiltrados.length === 0 ? (
        <p style={styles.vazio}>Nenhum agendamento nesta categoria.</p>
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
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentosFiltrados.map((a) => (
              <tr key={a.id}>
                <td style={styles.td}>{a.data}</td>
                <td style={styles.td}>{a.horarioInicio} - {a.horarioFim}</td>
                <td style={styles.td}>{a.clienteNome}</td>
                <td style={styles.td}>{a.servicoNome}</td>
                <td style={styles.td}>{a.funcionarioNome || 'Próprio'}</td>
                <td style={styles.td}>
                  <span style={estiloStatus(a.status)}>{a.status}</span>
                  {a.status === 'Cancelado' && a.motivoCancelamento && (
                    <p style={styles.motivo}>
                      {a.canceladoPor === 'Cliente' ? 'Pelo cliente: ' : 'Por você: '}
                      {a.motivoCancelamento}
                    </p>
                  )}
                </td>
                <td style={styles.td}>
                  {a.status === 'Confirmado' && (
                    <div style={styles.acoes}>
                      <button onClick={() => handleConcluir(a.id)} style={styles.botaoConcluir}>
                        Concluir
                      </button>
                      <button onClick={() => handleCancelar(a.id)} style={styles.botaoCancelar}>
                        Cancelar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalGenerico
        aberto={modalCancelarAberto}
        titulo="Cancelar agendamento"
        mensagem="Informe o motivo do cancelamento para o cliente:"
        comInput={true}
        inputObrigatorio={true}
        placeholderInput="Ex: profissional indisponível nesta data"
        textoBotaoConfirmar="Cancelar agendamento"
        aoConfirmar={confirmarCancelamento}
        aoFechar={() => { setModalCancelarAberto(false); setIdSelecionado(null); }}
      />

      <ModalGenerico
        aberto={modalConcluirAberto}
        titulo="Concluir agendamento"
        mensagem="Confirma que este atendimento foi realizado?"
        textoBotaoConfirmar="Concluir"
        aoConfirmar={confirmarConclusao}
        aoFechar={() => { setModalConcluirAberto(false); setIdSelecionado(null); }}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  vazio: {
    color: '#6b7280',
    fontSize: '16px',
  },
  abas: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  aba: {
    padding: '10px 20px',
    border: 'none',
    borderBottom: '2px solid transparent',
    backgroundColor: 'transparent',
    color: '#6b7280',
    fontSize: '14px',
    cursor: 'pointer',
  },
  abaAtiva: {
    padding: '10px 20px',
    border: 'none',
    borderBottom: '2px solid #7c3aed',
    backgroundColor: 'transparent',
    color: '#7c3aed',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
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
  acoes: {
    display: 'flex',
    gap: '8px',
  },
  botaoConcluir: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #16a34a',
    backgroundColor: '#fff',
    color: '#16a34a',
    fontSize: '13px',
    cursor: 'pointer',
  },
  botaoCancelar: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #dc2626',
    backgroundColor: '#fff',
    color: '#dc2626',
    fontSize: '13px',
    cursor: 'pointer',
  },
  motivo: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '4px 0 0',
    fontStyle: 'italic',
  },
};

export default MeusAgendamentosGestor;
