import type { ReactNode } from 'react';
import { tema } from './tema';

interface FundoTemaProps {
  children: ReactNode;
  largura?: 'estreito' | 'total';
}

function FundoTema({ children, largura = 'estreito' }: FundoTemaProps) {
  const estiloConteudo = largura === 'total' ? tema.conteudoLargo : tema.conteudo;

  return (
    <div style={tema.pagina}>
      <div style={tema.fundo} />
      <div style={estiloConteudo}>{children}</div>
    </div>
  );
}

export default FundoTema;
