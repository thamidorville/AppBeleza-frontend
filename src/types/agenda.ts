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
  status: string;
  enderecoBairro: string | null;
  enderecoCidade: string | null;
  distanciaKm: number | null;
  criadoEm: string;
}

export interface NovaAgendaRequest {
  funcionarioId?: string;
  servicoId: string;
  dataAgendamento: string;
  horaInicio: string;
  horaFim: string;
}
