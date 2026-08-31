import { useEffect, useState } from 'react';
import { listarMeusAgendamentos, cancelarAgendamento } from '../../services/agendamentoService';
import ModalGenerico from '../../components/shared/ModalGenerico';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
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
    <FundoTema>
      <div style={tema.hero}>
        <h1 style={tema.heroTitulo}>Meus Agendamentos</h1>
        <p style={tema.heroSubtitulo}>Seus horários marcados, tudo num lugar só.</p>
      </div>

      {agendamentos.length === 0 ? (
        <p style={tema.vazio}>Você ainda não fez nenhum agendamento.</p>
      ) : (
        <div style={tema.lista}>
          {agendamentos.map((a) => (
            <div key={a.id} style={tema.cardVidro}>
              <div style={styles.cardInfo}>
                <h3 style={tema.tituloClaro}>{a.usuarioNome}</h3>
                <p style={tema.textoDestaque}>{a.servicoNome}</p>
                <p style={tema.textoClaro}>
                  {a.funcionarioNome ? `Com ${a.funcionarioNome}` : 'Com o próprio profissional'}
                </p>
                <p style={tema.textoClaro}>{a.data} • {a.horarioInicio} - {a.horarioFim}</p>
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
    </FundoTema>
  );
}

const styles: Record<string, React.CSSProperties> = {
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
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
    border: '1px solid rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fecaca',
    fontSize: '13px',
    cursor: 'pointer',
  },
  motivo: {
    fontSize: '12px',
    color: '#e5e7eb',
    margin: 0,
    fontStyle: 'italic',
    maxWidth: '200px',
    textAlign: 'right',
    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
  },
  statusConfirmado: {
    color: '#86efac',
    fontWeight: 'bold',
    fontSize: '13px',
    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
  },
  statusCancelado: {
    color: '#fca5a5',
    fontWeight: 'bold',
    fontSize: '13px',
    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
  },
  statusConcluido: {
    color: '#93c5fd',
    fontWeight: 'bold',
    fontSize: '13px',
    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
  },
};

export default MeusAgendamentosPage;
