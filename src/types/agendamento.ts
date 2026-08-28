export interface Agendamento {
  id: string;
  agendaId: string;
  clienteId: string;
  clienteNome: string;
  servicoId: string;
  servicoNome: string;
  servicoPreco: number;
  funcionarioId: string | null;
  funcionarioNome: string | null;
  usuarioId: string;
  usuarioNome: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  status: string;
  motivoCancelamento: string | null;
  canceladoPor: string | null;
  criadoEm: string;
}
