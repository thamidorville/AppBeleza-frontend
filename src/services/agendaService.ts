import api from './api';
import type { Agenda, NovaAgendaRequest } from '../types/agenda';

export async function listarMinhaAgenda(): Promise<Agenda[]> {
  const response = await api.get('/agenda/minha-agenda');
  return response.data;
}

export async function criarAgenda(dados: NovaAgendaRequest): Promise<Agenda> {
  const response = await api.post('/agenda', dados);
  return response.data;
}

export async function atualizarAgenda(id: string, dados: NovaAgendaRequest): Promise<void> {
  await api.put(`/agenda/${id}`, dados);
}

export async function deletarAgenda(id: string): Promise<void> {
  await api.delete(`/agenda/${id}`);
}
