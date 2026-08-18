import { useEffect, useState } from 'react';
import { listarMeusFuncionarios } from '../../services/funcionarioService';
import ModalNovoFuncionario from '../../components/gestor/ModalNovoFuncionario';
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
    <div>
      <div style={styles.header}>
        <h1>Funcionários</h1>
        <button onClick={() => setModalAberto(true)} style={styles.botaoNovo}>
          + Novo Funcionário
        </button>
      </div>

      <ModalNovoFuncionario
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvar}
      />

      {funcionarios.length === 0 ? (
        <p style={styles.vazio}>Nenhum funcionário cadastrado ainda.</p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Telefone</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr key={f.id}>
                <td style={styles.td}>{f.nome}</td>
                <td style={styles.td}>{f.email}</td>
                <td style={styles.td}>{f.telefone || '-'}</td>
                <td style={styles.td}>
                  <span style={f.ativo ? styles.ativo : styles.inativo}>
                    {f.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  botaoNovo: {
    padding: '10px 20px',
    borderRadius: '6px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
  },
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
  ativo: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  inativo: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: '13px',
  },
};

export default FuncionariosPage;
