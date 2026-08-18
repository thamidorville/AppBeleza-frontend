import { useEffect, useState } from 'react';
import { criarAgenda } from '../../services/agendaService';
import { listarMeusFuncionarios } from '../../services/funcionarioService';
import { listarMeusServicos } from '../../services/servicoService';
import type { Funcionario } from '../../types/funcionario';
import type { Servico } from '../../types/servico';

interface ModalNovaAgendaProps {
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: () => void;
}

function ModalNovaAgenda({ aberto, aoFechar, aoSalvar }: ModalNovaAgendaProps) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [funcionarioId, setFuncionarioId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (aberto) {
      listarMeusFuncionarios().then(setFuncionarios);
      listarMeusServicos().then(setServicos);
    }
  }, [aberto]);

  if (!aberto) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await criarAgenda({
        funcionarioId: funcionarioId || undefined,
        servicoId,
        dataAgendamento,
        horaInicio,
        horaFim,
      });
      setFuncionarioId('');
      setServicoId('');
      setDataAgendamento('');
      setHoraInicio('');
      setHoraFim('');
      aoSalvar();
    } catch {
      setErro('Erro ao publicar horário. Verifique os dados.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.overlay} onClick={aoFechar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.titulo}>Novo Horário</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            value={funcionarioId}
            onChange={(e) => setFuncionarioId(e.target.value)}
            style={styles.input}
          >
            <option value="">Sem funcionário (eu mesmo)</option>
            {funcionarios.map((f) => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>

          <select
            value={servicoId}
            onChange={(e) => setServicoId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((s) => (
              <option key={s.id} value={s.id}>{s.nome} - R$ {s.preco.toFixed(2)}</option>
            ))}
          </select>

          <input
            type="date"
            value={dataAgendamento}
            onChange={(e) => setDataAgendamento(e.target.value)}
            style={styles.input}
            required
          />

          <div style={styles.horarios}>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              style={styles.inputHora}
              required
            />
            <span style={styles.ate}>até</span>
            <input
              type="time"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              style={styles.inputHora}
              required
            />
          </div>

          {erro && <p style={styles.erro}>{erro}</p>}

          <div style={styles.botoes}>
            <button type="button" onClick={aoFechar} style={styles.botaoCancelar}>
              Cancelar
            </button>
            <button type="submit" style={styles.botaoSalvar} disabled={carregando}>
              {carregando ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '32px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  titulo: {
    marginBottom: '24px',
    color: '#1f2937',
    fontSize: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  horarios: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  inputHora: {
    flex: 1,
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  ate: {
    color: '#6b7280',
    fontSize: '14px',
  },
  erro: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
  },
  botoes: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  botaoCancelar: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
  },
  botaoSalvar: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default ModalNovaAgenda;
