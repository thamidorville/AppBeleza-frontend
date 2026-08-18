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

export interface NovoServicoRequest {
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
}
