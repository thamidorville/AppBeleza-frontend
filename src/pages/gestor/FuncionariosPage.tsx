import { useEffect, useState } from 'react';
import { listarMeusFuncionarios } from '../../services/funcionarioService';
import ModalNovoFuncionario from '../../components/gestor/ModalNovoFuncionario';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
import type { Funcionario } from '../../types/funcionario';

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  async function carregar() {
    try {
      const dados = await listarMeusFuncionarios();
      setFuncionarios(dados);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
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
        <h1 style={tema.heroTitulo}>Funcionários</h1>
        <button onClick={() => setModalAberto(true)} style={tema.botaoPrimario}>
          + Novo Funcionário
        </button>
      </div>

      <ModalNovoFuncionario
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvar}
      />

      {funcionarios.length === 0 ? (
        <p style={tema.vazio}>Nenhum funcionário cadastrado ainda.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Nome</th>
              <th style={tema.th}>Email</th>
              <th style={tema.th}>Telefone</th>
              <th style={tema.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr key={f.id}>
                <td style={tema.td}>{f.nome}</td>
                <td style={tema.td}>{f.email}</td>
                <td style={tema.td}>{f.telefone || '-'}</td>
                <td style={tema.td}>
                  <span style={f.ativo ? tema.statusVerde : tema.statusVermelho}>
                    {f.ativo ? 'Ativo' : 'Inativo'}
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

export default FuncionariosPage;
