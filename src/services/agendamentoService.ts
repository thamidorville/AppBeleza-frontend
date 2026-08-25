import api from './api';
import type { Agenda } from '../types/agenda';
import type { Agendamento } from '../types/agendamento';

export async function listarVitrineDoCliente(): Promise<Agenda[]> {
  const response = await api.get('/agenda/vitrine-do-cliente');
  return response.data;
}

export async function criarAgendamento(agendaId: string): Promise<void> {
  await api.post('/agendamento', { agendaId });
}

export async function listarMeusAgendamentos(): Promise<Agendamento[]> {
  const response = await api.get('/agendamento/meus-agendamentos');
  return response.data;
}

export async function listarMeusAgendamentosGestor(): Promise<Agendamento[]> {
  const response = await api.get('/agendamento/meus-agendamentos-gestor');
  return response.data;
}
