import { useEffect, useState } from 'react';
import { listarClientes, listarAgendamentosDoCliente } from '../../services/adminService';
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
    <div>
      <h1>Clientes</h1>

      {clientes.length === 0 ? (
        <p style={styles.vazio}>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Telefone</th>
              <th style={styles.th}>Cadastro</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <>
                <tr key={c.id}>
                  <td style={styles.td}>{c.nome}</td>
                  <td style={styles.td}>{c.email}</td>
                  <td style={styles.td}>{c.telefone || '-'}</td>
                  <td style={styles.td}>{c.criadoEm}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleExpandir(c.id)} style={styles.botaoVer}>
                      {clienteExpandido === c.id ? 'Fechar' : 'Ver agendamentos'}
                    </button>
                  </td>
                </tr>
                {clienteExpandido === c.id && (
                  <tr key={`${c.id}-agendamentos`}>
                    <td colSpan={5} style={styles.tdExpandido}>
                      {carregandoAgendamentos ? (
                        <p>Carregando agendamentos...</p>
                      ) : agendamentos.length === 0 ? (
                        <p style={styles.vazio}>Nenhum agendamento encontrado.</p>
                      ) : (
                        <table style={styles.tabelaInterna}>
                          <thead>
                            <tr>
                              <th style={styles.thInterno}>Salão</th>
                              <th style={styles.thInterno}>Serviço</th>
                              <th style={styles.thInterno}>Preço</th>
                              <th style={styles.thInterno}>Funcionário</th>
                              <th style={styles.thInterno}>Data</th>
                              <th style={styles.thInterno}>Horário</th>
                              <th style={styles.thInterno}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {agendamentos.map((a) => (
                              <tr key={a.id}>
                                <td style={styles.tdInterno}>{a.usuarioNome}</td>
                                <td style={styles.tdInterno}>{a.servicoNome}</td>
                                <td style={styles.tdInterno}>R$ {a.servicoPreco?.toFixed(2)}</td>
                                <td style={styles.tdInterno}>{a.funcionarioNome || 'Próprio'}</td>
                                <td style={styles.tdInterno}>{a.data}</td>
                                <td style={styles.tdInterno}>{a.horarioInicio} - {a.horarioFim}</td>
                                <td style={styles.tdInterno}>{a.status}</td>
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
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  vazio: {
    color: '#6b7280',
    fontSize: '16px',
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
  tdExpandido: {
    padding: '16px 24px',
    backgroundColor: '#f3f4f6',
  },
  tabelaInterna: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thInterno: {
    textAlign: 'left',
    padding: '10px 12px',
    color: '#374151',
    fontSize: '12px',
    fontWeight: '600',
    borderBottom: '1px solid #e5e7eb',
  },
  tdInterno: {
    padding: '10px 12px',
    fontSize: '13px',
    color: '#1f2937',
    borderBottom: '1px solid #e5e7eb',
  },
  botaoVer: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #7c3aed',
    backgroundColor: '#fff',
    color: '#7c3aed',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default ClientesPage;
