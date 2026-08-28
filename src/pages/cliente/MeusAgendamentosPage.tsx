import { useEffect, useState } from 'react';
import { listarMeusAgendamentos, cancelarAgendamento } from '../../services/agendamentoService';
import ModalGenerico from '../../components/shared/ModalGenerico';
import type { Agendamento } from '../../types/agendamento';

function MeusAgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaCancelar, setIdParaCancelar] = useState<string | null>(null);

  async function carregar() {
    try {
      const dados = await listarMeusAgendamentos();
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
    setIdParaCancelar(id);
    setModalAberto(true);
  }

  async function confirmarCancelamento(motivo?: string) {
    if (!idParaCancelar || !motivo) return;

    try {
      await cancelarAgendamento(idParaCancelar, motivo);
      carregar();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Não foi possível cancelar o agendamento.');
    } finally {
      setModalAberto(false);
      setIdParaCancelar(null);
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Meus Agendamentos</h1>

      {agendamentos.length === 0 ? (
        <p style={styles.vazio}>Você ainda não fez nenhum agendamento.</p>
      ) : (
        <div style={styles.lista}>
          {agendamentos.map((a) => (
            <div key={a.id} style={styles.card}>
              <div style={styles.cardInfo}>
                <h3 style={styles.salao}>{a.usuarioNome}</h3>
                <p style={styles.servico}>{a.servicoNome}</p>
                <p style={styles.detalhe}>
                  {a.funcionarioNome ? `Com ${a.funcionarioNome}` : 'Com o próprio profissional'}
                </p>
                <p style={styles.data}>{a.data} • {a.horarioInicio} - {a.horarioFim}</p>
              </div>
              <div style={styles.cardAcoes}>
                <span style={a.status === 'Confirmado' ? styles.statusConfirmado : a.status === 'Cancelado' ? styles.statusCancelado : styles.statusConcluido}>
                  {a.status}
                </span>
                {a.status === 'Confirmado' && (
                  <button onClick={() => handleCancelar(a.id)} style={styles.botaoCancelar}>
                    Cancelar
                  </button>
                )}
                {a.status === 'Cancelado' && a.motivoCancelamento && (
                  <p style={styles.motivo}>
                    {a.canceladoPor === 'Gestor' ? 'Pelo salão: ' : 'Por você: '}
                    {a.motivoCancelamento}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalGenerico
        aberto={modalAberto}
        titulo="Cancelar agendamento"
        mensagem="Informe o motivo do cancelamento:"
        comInput={true}
        inputObrigatorio={true}
        placeholderInput="Ex: não poderei comparecer"
        textoBotaoConfirmar="Cancelar agendamento"
        aoConfirmar={confirmarCancelamento}
        aoFechar={() => { setModalAberto(false); setIdParaCancelar(null); }}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  vazio: {
    color: '#6b7280',
    fontSize: '16px',
  },
  cardAcoes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
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
    margin: 0,
    fontStyle: 'italic',
    maxWidth: '200px',
    textAlign: 'right',
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '24px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  data: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  salao: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  servico: {
    fontSize: '14px',
    color: '#7c3aed',
    fontWeight: '600',
    margin: 0,
  },
  detalhe: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
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

export default MeusAgendamentosPage;
