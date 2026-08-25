import { useEffect, useState } from 'react';
import { listarUsuarios } from '../../services/adminService';
import ModalNovoGestor from '../../components/admin/ModalNovoGestor';
import type { Usuario } from '../../types/usuario';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  async function carregar() {
    try {
      const dados = await listarUsuarios();
      setUsuarios(dados);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
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
        <h1>Usuários (Gestores)</h1>
        <button onClick={() => setModalAberto(true)} style={styles.botaoNovo}>
          + Novo Gestor
        </button>
      </div>

      <ModalNovoGestor
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvar}
      />

      {usuarios.length === 0 ? (
        <p style={styles.vazio}>Nenhum gestor cadastrado ainda.</p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Documento</th>
              <th style={styles.th}>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td style={styles.td}>{u.nome}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.tipoPessoa}</td>
                <td style={styles.td}>{u.documento}</td>
                <td style={styles.td}>{u.telefone || '-'}</td>
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
    border: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
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
};

export default UsuariosPage;
