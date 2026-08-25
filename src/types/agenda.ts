export interface Agenda {
  id: string;
  funcionarioId: string | null;
  funcionarioNome: string | null;
  usuarioId: string;
  usuarioNome: string;
  servicoId: string;
  servicoNome: string;
  dataAgendamento: string;
  horaInicio: string;
  horaFim: string;
  disponivel: boolean;
  criadoEm: string;
}

export interface NovaAgendaRequest {
  funcionarioId?: string;
  servicoId: string;
  dataAgendamento: string;
  horaInicio: string;
  horaFim: string;
}
