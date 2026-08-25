import { useEffect, useState } from 'react';
import { listarVitrineDoCliente, criarAgendamento } from '../../services/agendamentoService';
import type { Agenda } from '../../types/agenda';

function BuscarPage() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState('');

  async function carregar() {
    try {
      const dados = await listarVitrineDoCliente();
      setAgendas(dados);
    } catch (error) {
      console.error('Erro ao carregar vitrine:', error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleAgendar(agendaId: string) {
    setMensagem('');
    try {
      await criarAgendamento(agendaId);
      setMensagem('Agendamento realizado com sucesso!');
      carregar();
    } catch {
      setMensagem('Erro ao agendar. Tente novamente.');
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Buscar Serviços</h1>
      <p style={styles.subtitulo}>Horários disponíveis perto de você</p>

      {mensagem && <p style={styles.mensagem}>{mensagem}</p>}

      {agendas.length === 0 ? (
        <p style={styles.vazio}>Nenhum horário disponível no momento.</p>
      ) : (
        <div style={styles.lista}>
          {agendas.map((a) => (
            <div key={a.id} style={styles.card}>
              <div style={styles.cardInfo}>
                <h3 style={styles.salao}>{a.usuarioNome}</h3>
                <p style={styles.servico}>{a.servicoNome}</p>
                <p style={styles.detalhe}>
                  {a.funcionarioNome ? `Com ${a.funcionarioNome}` : 'Com o próprio profissional'}
                </p>
                <p style={styles.detalhe}>
                  {a.dataAgendamento} • {a.horaInicio} - {a.horaFim}
                </p>
              </div>
              <button onClick={() => handleAgendar(a.id)} style={styles.botaoAgendar}>
                Agendar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  subtitulo: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '24px',
  },
  mensagem: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    fontSize: '14px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  vazio: {
    color: '#6b7280',
    fontSize: '16px',
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
  botaoAgendar: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default BuscarPage;
