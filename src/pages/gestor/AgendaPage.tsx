import { useEffect, useState } from 'react';
import { listarMinhaAgenda, deletarAgenda } from '../../services/agendaService';
import ModalNovaAgenda from '../../components/gestor/ModalNovaAgenda';
import ModalGenerico from '../../components/shared/ModalGenerico';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
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
    <FundoTema largura="total">
      <div style={tema.header}>
        <h1 style={tema.heroTitulo}>Agenda</h1>
        <button onClick={abrirNovo} style={tema.botaoPrimario}>
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
        <p style={tema.vazio}>Nenhum horário publicado ainda.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Data</th>
              <th style={tema.th}>Horário</th>
              <th style={tema.th}>Funcionário</th>
              <th style={tema.th}>Serviço</th>
              <th style={tema.th}>Status</th>
              <th style={tema.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendas.map((a) => (
              <tr key={a.id}>
                <td style={tema.td}>{a.dataAgendamento}</td>
                <td style={tema.td}>{a.horaInicio} - {a.horaFim}</td>
                <td style={tema.td}>{a.funcionarioNome || 'Próprio'}</td>
                <td style={tema.td}>{a.servicoNome}</td>
                <td style={tema.td}>
                  <span style={a.status === 'Disponivel' ? tema.statusVerde : a.status === 'Cancelado' ? tema.statusVermelho : tema.statusAmarelo}>
                    {a.status}
                  </span>
                </td>
                <td style={tema.td}>
                  <div style={tema.acoes}>
                    <button onClick={() => abrirEdicao(a)} style={tema.botaoAcaoRoxo}>
                      Editar
                    </button>
                    <button onClick={() => handleRemover(a)} style={tema.botaoAcaoVermelho}>
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
    </FundoTema>
  );
}

export default AgendaPage;
