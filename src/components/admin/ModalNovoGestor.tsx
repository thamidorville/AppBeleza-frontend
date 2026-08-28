import { useState } from 'react';
import { criarGestor, criarEnderecoParaUsuario } from '../../services/adminService';
import { consultarCep } from '../../services/cepService';

interface ModalNovoGestorProps {
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: () => void;
}

function ModalNovoGestor({ aberto, aoFechar, aoSalvar }: ModalNovoGestorProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('PF');
  const [documento, setDocumento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (!aberto) return null;

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
    setErro('');
    setCarregando(true);

    try {
      const usuarioId = await criarGestor({ nome, email, senha, tipoPessoa, documento, telefone });

      await criarEnderecoParaUsuario(usuarioId, {
        logradouro, numero, complemento, bairro, cidade, estado, cep,
      });

      aoSalvar();
    } catch {
      setErro('Erro ao cadastrar gestor. Verifique os dados.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.overlay} onClick={aoFechar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.titulo}>Novo Gestor</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Nome do profissional/salão" value={nome} onChange={(e) => setNome(e.target.value)} style={styles.input} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          <input type="password" placeholder="Senha inicial" value={senha} onChange={(e) => setSenha(e.target.value)} style={styles.input} required />
          <select value={tipoPessoa} onChange={(e) => setTipoPessoa(e.target.value)} style={styles.input}>
            <option value="PF">Pessoa Física</option>
            <option value="PJ">Pessoa Jurídica</option>
          </select>
          <input type="text" placeholder={tipoPessoa === 'PF' ? 'CPF' : 'CNPJ'} value={documento} onChange={(e) => setDocumento(e.target.value)} style={styles.input} required />
          <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={styles.input} />

          <hr style={styles.separador} />
          <p style={styles.secao}>Endereço do salão</p>

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

          {erro && <p style={styles.erro}>{erro}</p>}

          <div style={styles.botoes}>
            <button type="button" onClick={aoFechar} style={styles.botaoCancelar}>Cancelar</button>
            <button type="submit" style={styles.botaoSalvar} disabled={carregando}>
              {carregando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' },
  titulo: { marginBottom: '24px', color: '#1f2937', fontSize: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', backgroundColor: '#fff' },
  inputPequeno: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', backgroundColor: '#fff' },
  linha: { display: 'flex', gap: '12px' },
  separador: { border: 'none', borderTop: '1px solid #e5e7eb', margin: '8px 0' },
  secao: { fontSize: '14px', fontWeight: 'bold', color: '#374151', margin: 0 },
  erro: { color: '#dc2626', fontSize: '14px', textAlign: 'center' },
  botoes: { display: 'flex', gap: '12px', marginTop: '8px' },
  botaoCancelar: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#374151', fontSize: '14px', cursor: 'pointer' },
  botaoSalvar: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
};

export default ModalNovoGestor;
