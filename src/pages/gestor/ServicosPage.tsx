import { useEffect, useState } from 'react';
import { listarMeusServicos } from '../../services/servicoService';
import ModalNovoServico from '../../components/gestor/ModalNovoServico';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
import type { Servico } from '../../types/servico';

function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  async function carregar() {
    try {
      const dados = await listarMeusServicos();
      setServicos(dados);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
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
    <FundoTema largura="total">
      <div style={tema.header}>
        <h1 style={tema.heroTitulo}>Serviços</h1>
        <button onClick={() => setModalAberto(true)} style={tema.botaoPrimario}>
          + Novo Serviço
        </button>
      </div>

      <ModalNovoServico
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvar}
      />

      {servicos.length === 0 ? (
        <p style={tema.vazio}>Nenhum serviço cadastrado ainda.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Nome</th>
              <th style={tema.th}>Preço</th>
              <th style={tema.th}>Duração</th>
              <th style={tema.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((s) => (
              <tr key={s.id}>
                <td style={tema.td}>{s.nome}</td>
                <td style={tema.td}>R$ {s.preco.toFixed(2)}</td>
                <td style={tema.td}>{s.duracaoMinutos} min</td>
                <td style={tema.td}>
                  <span style={s.ativo ? tema.statusVerde : tema.statusVermelho}>
                    {s.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </FundoTema>
  );
}

export default ServicosPage;
