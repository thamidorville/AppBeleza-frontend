export interface Funcionario {
  id: string;
  usuarioId: string;
  nome: string;
  email: string;
  telefone: string | null;
  ativo: boolean;
  criadoEm: string;
}
