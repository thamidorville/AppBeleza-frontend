import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';
import FundoTema from '../../styles/FundoTema';
import { tema } from '../../styles/tema';

function AgendaPage() {
  const { token } = useAuth();
  const dados = getTokenData(token);

  return (
    <FundoTema largura="total">
      <div style={tema.hero}>
        <h1 style={tema.heroTitulo}>Oi, {dados?.nome}</h1>
        <p style={tema.heroSubtitulo}>Aqui você visualiza seus horários e agendamentos.</p>
      </div>
    </FundoTema>
  );
}

export default AgendaPage;
