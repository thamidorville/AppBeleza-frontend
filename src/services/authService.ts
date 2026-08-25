import api from './api';

export async function alterarSenha(senhaAtual: string, novaSenha: string): Promise<void> {
  await api.put('/auth/alterar-senha', { senhaAtual, novaSenha });
}
