import { useEffect, useState } from 'react';
import { listarVitrineDoCliente, criarAgendamento } from '../../services/agendamentoService';
import { obterMeuEndereco } from '../../services/cepService';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
import type { Agenda } from '../../types/agenda';

function BuscarPage() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState('');

  async function carregar() {
    try {
      const meuEndereco = await obterMeuEndereco();
      const lat = meuEndereco?.latitude;
      const lng = meuEndereco?.longitude;
      const dados = await listarVitrineDoCliente(lat, lng);
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
    <FundoTema>
      <div style={tema.hero}>
        <h1 style={tema.heroTitulo}>Buscar Serviços</h1>
        <p style={tema.heroSubtitulo}>Abriu, achou, agendou. Beleza pertinho de você.</p>
      </div>

      {mensagem && <p style={styles.mensagem}>{mensagem}</p>}

      {agendas.length === 0 ? (
        <p style={tema.vazio}>Nenhum horário disponível no momento.</p>
      ) : (
        <div style={tema.lista}>
          {agendas.map((a) => (
            <div key={a.id} style={tema.cardVidro}>
              <div style={styles.cardInfo}>
                <h3 style={tema.tituloClaro}>{a.usuarioNome}</h3>
                <p style={tema.textoDestaque}>{a.servicoNome}</p>
                <p style={tema.textoClaro}>
                  {a.funcionarioNome ? `Com ${a.funcionarioNome}` : 'Com o próprio profissional'}
                </p>
                <p style={tema.textoClaro}>
                  {a.dataAgendamento} • {a.horaInicio} - {a.horaFim}
                </p>
                {a.enderecoBairro && a.enderecoCidade && (
                  <p style={tema.textoClaro}>{a.enderecoBairro}, {a.enderecoCidade}</p>
                )}
                {a.distanciaKm != null && (
                  <p style={tema.textoSucesso}>{a.distanciaKm} km de você</p>
                )}
              </div>
              <button onClick={() => handleAgendar(a.id)} style={tema.botaoPrimario}>
                Agendar
              </button>
            </div>
          ))}
        </div>
      )}
    </FundoTema>
  );
}

const styles: Record<string, React.CSSProperties> = {
  mensagem: {
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: 'rgba(240, 253, 244, 0.9)',
    color: '#16a34a',
    fontSize: '14px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
};

export default BuscarPage;
