import { useEffect, useState } from 'react';
import { listarUsuarios } from '../../services/adminService';
import ModalNovoGestor from '../../components/admin/ModalNovoGestor';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';
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
    <FundoTema largura="total">
      <div style={styles.header}>
        <h1 style={tema.heroTitulo}>Usuários (Gestores)</h1>
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
        <p style={tema.vazio}>Nenhum gestor cadastrado ainda.</p>
      ) : (
        <table style={tema.tabelaVidro}>
          <thead>
            <tr>
              <th style={tema.th}>Nome</th>
              <th style={tema.th}>Email</th>
              <th style={tema.th}>Role</th>
              <th style={tema.th}>Tipo</th>
              <th style={tema.th}>Documento</th>
              <th style={tema.th}>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td style={tema.td}>{u.nome}</td>
                <td style={tema.td}>{u.email}</td>
                <td style={tema.td}>{u.role}</td>
                <td style={tema.td}>{u.tipoPessoa}</td>
                <td style={tema.td}>{u.documento}</td>
                <td style={tema.td}>{u.telefone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </FundoTema>
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
};

export default UsuariosPage;
