import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { consultarCep } from '../../services/cepService';
import {
  obterPerfilCliente,
  obterPerfilGestor,
  atualizarPerfilCliente,
  atualizarPerfilGestor,
} from '../../services/perfilService';

function MeusDadosPage() {
  const navigate = useNavigate();
  const { role } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const dados = role === 'Cliente' ? await obterPerfilCliente() : await obterPerfilGestor();
        setNome(dados.nome);
        setEmail(dados.email);
        setTelefone(dados.telefone ?? '');
        if (dados.endereco) {
          setCep(dados.endereco.cep);
          setLogradouro(dados.endereco.logradouro);
          setNumero(dados.endereco.numero);
          setComplemento(dados.endereco.complemento ?? '');
          setBairro(dados.endereco.bairro);
          setCidade(dados.endereco.cidade);
          setEstado(dados.endereco.estado);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [role]);

  async function handleCepBlur() {
    if (cep.length < 8) return;
    const dados = await consultarCep(cep);
    if (dados) {
      setLogradouro(dados.logradouro);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem('');
    setSalvando(true);

    const dados = { nome, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado };

    try {
      if (role === 'Cliente') {
        await atualizarPerfilCliente(dados);
      } else {
        await atualizarPerfilGestor(dados);
      }
      setMensagem('Perfil atualizado com sucesso!');
    } catch {
      setMensagem('Erro ao atualizar perfil.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <p>Carregando...</p>;

  return (
    <div style={styles.pagina}>
      <div style={styles.container}>
        <button type="button" onClick={() => navigate(-1)} style={styles.botaoVoltar}>
          ← Voltar
        </button>
        <h1 style={styles.titulo}>Meus Dados</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={styles.input} required />
          <input type="email" value={email} style={{ ...styles.input, backgroundColor: '#f3f4f6' }} disabled />
          <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={styles.input} />

          <p style={styles.secao}>Endereço</p>
          <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleCepBlur} style={styles.input} required />
          <input type="text" placeholder="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} style={styles.input} required />
          <div style={styles.linha}>
            <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} style={styles.inputPequeno} required />
            <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} style={styles.inputPequeno} />
          </div>
          <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} style={styles.input} required />
          <div style={styles.linha}>
            <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} style={styles.inputPequeno} required />
            <input type="text" placeholder="UF" value={estado} onChange={(e) => setEstado(e.target.value)} style={{ ...styles.inputPequeno, maxWidth: '80px' }} required />
          </div>

          {mensagem && <p style={styles.mensagem}>{mensagem}</p>}

          <button type="submit" style={styles.botao} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pagina: { minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px' },
  container: { width: '100%', maxWidth: '480px' },
  botaoVoltar: { background: 'none', border: 'none', color: '#7c3aed', fontSize: '14px', cursor: 'pointer', padding: 0, marginBottom: '16px' },
  titulo: { marginBottom: '24px', color: '#1f2937', fontSize: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', backgroundColor: '#fff' },
  inputPequeno: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', backgroundColor: '#fff' },
  linha: { display: 'flex', gap: '12px' },
  secao: { fontSize: '14px', fontWeight: 'bold', color: '#374151', margin: '8px 0 0' },
  mensagem: { fontSize: '14px', textAlign: 'center', color: '#16a34a' },
  botao: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' },
};

export default MeusDadosPage;
