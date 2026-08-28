import api from './api';
import type { Usuario, NovoGestorRequest } from '../types/usuario';
import type { ClienteAdmin } from '../types/cliente';
import type { Agendamento } from '../types/agendamento';

export async function listarUsuarios(): Promise<Usuario[]> {
  const response = await api.get('/usuario');
  return response.data;
}

export async function criarGestor(dados: NovoGestorRequest): Promise<string> {
  const response = await api.post('/auth/cadastro/usuario', dados);
  return response.data.id;
}

export async function criarEnderecoParaUsuario(usuarioId: string, dados: {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}): Promise<void> {
  await api.post(`/endereco/usuario/${usuarioId}`, dados);
}

export async function listarClientes(): Promise<ClienteAdmin[]> {
  const response = await api.get('/cliente');
  return response.data;
}

export async function listarAgendamentosDoCliente(clienteId: string): Promise<Agendamento[]> {
  const response = await api.get(`/agendamento/cliente/${clienteId}`);
  return response.data;
}
