import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';

function AgendaPage() {
  const { token } = useAuth();
  const dados = getTokenData(token);

  return (
    <div>
      <h1>Oi, {dados?.nome}</h1>
      <p>Aqui você visualiza seus horários e agendamentos.</p>
    </div>
  );
}

export default AgendaPage;
