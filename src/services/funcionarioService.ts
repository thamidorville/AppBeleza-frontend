import api from './api';
import type { Funcionario } from '../types/funcionario';

export interface NovoFuncionarioRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export async function listarMeusFuncionarios(): Promise<Funcionario[]> {
  const response = await api.get('/funcionario/meus-funcionarios');
  return response.data;
}

export async function criarFuncionario(dados: NovoFuncionarioRequest): Promise<Funcionario> {
  const response = await api.post('/funcionario', dados);
  return response.data;
}
