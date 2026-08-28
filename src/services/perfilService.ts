import api from './api';

export interface PerfilData {
  nome: string;
  email: string;
  telefone: string | null;
  tipoPessoa?: string;
  documento?: string;
  endereco: {
    id: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  } | null;
}

export interface PerfilUpdateRequest {
  nome: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export async function obterPerfilCliente(): Promise<PerfilData> {
  const response = await api.get('/cliente/meu-perfil');
  return response.data;
}

export async function atualizarPerfilCliente(dados: PerfilUpdateRequest): Promise<void> {
  await api.put('/cliente/meu-perfil', dados);
}

export async function obterPerfilGestor(): Promise<PerfilData> {
  const response = await api.get('/usuario/meu-perfil');
  return response.data;
}

export async function atualizarPerfilGestor(dados: PerfilUpdateRequest): Promise<void> {
  await api.put('/usuario/meu-perfil', dados);
}
