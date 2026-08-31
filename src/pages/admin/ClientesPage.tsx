import { useEffect, useState } from 'react';
import { listarClientes, listarAgendamentosDoCliente } from '../../services/adminService';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
import type { ClienteAdmin } from '../../types/cliente';
import type { Agendamento } from '../../types/agendamento';

function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteAdmin[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [clienteExpandido, setClienteExpandido] = useState<string | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregandoAgendamentos, setCarregandoAgendamentos] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarClientes();
        setClientes(dados);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function handleExpandir(clienteId: string) {
    if (clienteExpandido === clienteId) {
      setClienteExpandido(null);
      setAgendamentos([]);
      return;
    }

    setClienteExpandido(clienteId);
    setCarregandoAgendamentos(true);

    try {
      const dados = await listarAgendamentosDoCliente(clienteId);
      setAgendamentos(dados);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      setAgendamentos([]);
    } finally {
      setCarregandoAgendamentos(false);
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <FundoTema largura="total">
      <h1 style={tema.heroTitulo}>Clientes</h1>

      {clientes.length === 0 ? (
        <p style={tema.vazio}>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Nome</th>
              <th style={tema.th}>Email</th>
              <th style={tema.th}>Telefone</th>
              <th style={tema.th}>Cadastro</th>
              <th style={tema.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <>
                <tr key={c.id}>
                  <td style={tema.td}>{c.nome}</td>
                  <td style={tema.td}>{c.email}</td>
                  <td style={tema.td}>{c.telefone || '-'}</td>
                  <td style={tema.td}>{c.criadoEm}</td>
                  <td style={tema.td}>
                    <button onClick={() => handleExpandir(c.id)} style={tema.botaoSecundario}>
                      {clienteExpandido === c.id ? 'Fechar' : 'Ver agendamentos'}
                    </button>
                  </td>
                </tr>
                {clienteExpandido === c.id && (
                  <tr key={`${c.id}-agendamentos`}>
                    <td colSpan={5} style={tema.tdExpandido}>
                      {carregandoAgendamentos ? (
                        <p style={tema.textoClaro}>Carregando agendamentos...</p>
                      ) : agendamentos.length === 0 ? (
                        <p style={tema.textoClaro}>Nenhum agendamento encontrado.</p>
                      ) : (
                        <table style={styles.tabelaInterna}>
                          <thead>
                            <tr>
                              <th style={tema.thInterno}>Salão</th>
                              <th style={tema.thInterno}>Serviço</th>
                              <th style={tema.thInterno}>Preço</th>
                              <th style={tema.thInterno}>Funcionário</th>
                              <th style={tema.thInterno}>Data</th>
                              <th style={tema.thInterno}>Horário</th>
                              <th style={tema.thInterno}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {agendamentos.map((a) => (
                              <tr key={a.id}>
                                <td style={tema.tdInterno}>{a.usuarioNome}</td>
                                <td style={tema.tdInterno}>{a.servicoNome}</td>
                                <td style={tema.tdInterno}>R$ {a.servicoPreco?.toFixed(2)}</td>
                                <td style={tema.tdInterno}>{a.funcionarioNome || 'Próprio'}</td>
                                <td style={tema.tdInterno}>{a.data}</td>
                                <td style={tema.tdInterno}>{a.horarioInicio} - {a.horarioFim}</td>
                                <td style={tema.tdInterno}>{a.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </FundoTema>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tabelaInterna: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default ClientesPage;
