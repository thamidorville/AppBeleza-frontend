export interface Servico {
  id: string;
  usuarioId: string;
  nome: string;
  descricao: string | null;
  preco: number;
  duracaoMinutos: number;
  ativo: boolean;
  criadoEm: string;
}
