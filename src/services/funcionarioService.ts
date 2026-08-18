import api from './api';
import type { Funcionario, NovoFuncionarioRequest } from '../types/funcionario';

export async function listarMeusFuncionarios(): Promise<Funcionario[]> {
  const response = await api.get('/funcionario/meus-funcionarios');
  return response.data;
}

export async function criarFuncionario(dados: NovoFuncionarioRequest): Promise<Funcionario> {
  const response = await api.post('/funcionario', dados);
  return response.data;
}
