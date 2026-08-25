export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipoPessoa: string;
  documento: string;
  telefone: string | null;
  role: string;
  criadoEm: string;
}

export interface NovoGestorRequest {
  nome: string;
  email: string;
  senha: string;
  tipoPessoa: string;
  documento: string;
  telefone: string;
}
