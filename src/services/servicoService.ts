import api from './api';
import type { Servico } from '../types/servico';

export interface NovoServicoRequest {
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
}

export async function listarMeusServicos(): Promise<Servico[]> {
  const response = await api.get('/servico/meus-servicos');
  return response.data;
}

export async function criarServico(dados: NovoServicoRequest): Promise<Servico> {
  const response = await api.post('/servico', dados);
  return response.data;
}
