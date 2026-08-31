import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';

interface Card {
  titulo: string;
  descricao: string;
  imagem: string;
  rota: string;
}

const cards: Card[] = [
  { titulo: 'Funcionários', descricao: 'Gerencie sua equipe', imagem: '/funcionarios.png', rota: '/funcionarios' },
  { titulo: 'Serviços', descricao: 'Cadastre seu catálogo', imagem: '/servicos.png', rota: '/servicos' },
  { titulo: 'Agenda', descricao: 'Publique seus horários', imagem: '/agenda.png', rota: '/agenda' },
  { titulo: 'Agendamentos', descricao: 'Acompanhe suas marcações', imagem: '/agendamentos.png', rota: '/agendamentos' },
];

function DashboardPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const dados = getTokenData(token);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <FundoTema largura="total">
      <div style={tema.hero}>
        <h1 style={tema.heroTitulo}>Oi, {dados?.nome}</h1>
        <p style={tema.heroSubtitulo}>Bem-vindo ao painel do seu estabelecimento.</p>
      </div>

      <div style={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.rota}
            onClick={() => navigate(card.rota)}
            onMouseEnter={() => setHover(card.rota)}
            onMouseLeave={() => setHover(null)}
            style={{
              ...styles.card,
              backgroundImage: `url(${card.imagem})`,
              transform: hover === card.rota ? 'translateY(-6px) scale(1.02)' : 'none',
              boxShadow: hover === card.rota
                ? '0 12px 28px rgba(124, 58, 237, 0.35)'
                : '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                ...styles.overlay,
                backdropFilter: hover === card.rota ? 'blur(0px)' : 'blur(1px)',
                backgroundColor: hover === card.rota
                  ? 'rgba(31, 41, 55, 0.35)'
                  : 'rgba(31, 41, 55, 0.45)',
              }}
            >
              <h3 style={styles.cardTitulo}>{card.titulo}</h3>
              <p style={styles.cardDescricao}>{card.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </FundoTema>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  card: {
    position: 'relative',
    height: '180px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px',
    transition: 'background-color 0.25s ease, backdrop-filter 0.25s ease',
  },
  cardTitulo: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  cardDescricao: {
    color: '#e5e7eb',
    fontSize: '13px',
    margin: '4px 0 0',
  },
};

export default DashboardPage;
