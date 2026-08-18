import api from './api';
import type { Servico, NovoServicoRequest } from '../types/servico';

export async function listarMeusServicos(): Promise<Servico[]> {
  const response = await api.get('/servico/meus-servicos');
  return response.data;
}

export async function criarServico(dados: NovoServicoRequest): Promise<Servico> {
  const response = await api.post('/servico', dados);
  return response.data;
}
