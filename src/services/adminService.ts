import api from './api';
import type { Usuario, NovoGestorRequest } from '../types/usuario';

export async function listarUsuarios(): Promise<Usuario[]> {
  const response = await api.get('/usuario');
  return response.data;
}

export async function criarGestor(dados: NovoGestorRequest): Promise<void> {
  await api.post('/auth/cadastro/usuario', dados);
}
