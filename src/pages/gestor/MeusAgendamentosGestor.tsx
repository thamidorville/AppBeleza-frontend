import { useEffect, useState } from 'react';
import { listarMeusAgendamentosGestor, cancelarAgendamentoGestor, concluirAgendamento } from '../../services/agendamentoService';
import ModalGenerico from '../../components/shared/ModalGenerico';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
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
    if (status === 'Confirmado') return tema.statusVerde;
    if (status === 'Cancelado') return tema.statusVermelho;
    return tema.statusAzul;
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
    <FundoTema largura="total">
      <h1 style={tema.heroTitulo}>Agendamentos</h1>

      <div style={tema.abas}>
        {abas.map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={abaAtiva === aba ? tema.abaAtiva : tema.aba}
          >
            {rotuloAba[aba]}
          </button>
        ))}
      </div>

      {agendamentosFiltrados.length === 0 ? (
        <p style={tema.vazio}>Nenhum agendamento nesta categoria.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Data</th>
              <th style={tema.th}>Horário</th>
              <th style={tema.th}>Cliente</th>
              <th style={tema.th}>Serviço</th>
              <th style={tema.th}>Funcionário</th>
              <th style={tema.th}>Status</th>
              <th style={tema.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentosFiltrados.map((a) => (
              <tr key={a.id}>
                <td style={tema.td}>{a.data}</td>
                <td style={tema.td}>{a.horarioInicio} - {a.horarioFim}</td>
                <td style={tema.td}>{a.clienteNome}</td>
                <td style={tema.td}>{a.servicoNome}</td>
                <td style={tema.td}>{a.funcionarioNome || 'Próprio'}</td>
                <td style={tema.td}>
                  <span style={estiloStatus(a.status)}>{a.status}</span>
                  {a.status === 'Cancelado' && a.motivoCancelamento && (
                    <p style={tema.motivo}>
                      {a.canceladoPor === 'Cliente' ? 'Pelo cliente: ' : 'Por você: '}
                      {a.motivoCancelamento}
                    </p>
                  )}
                </td>
                <td style={tema.td}>
                  {a.status === 'Confirmado' && (
                    <div style={tema.acoes}>
                      <button onClick={() => handleConcluir(a.id)} style={tema.botaoAcaoVerde}>
                        Concluir
                      </button>
                      <button onClick={() => handleCancelar(a.id)} style={tema.botaoAcaoVermelho}>
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
    </FundoTema>
  );
}

export default MeusAgendamentosGestor;
