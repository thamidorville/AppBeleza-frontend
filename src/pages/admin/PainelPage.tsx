import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';

function PainelPage() {
  const { token } = useAuth();
  const dados = getTokenData(token);

  return (
    <div>
      <h1>Oi, {dados?.nome}</h1>
      <p>Visão geral da plataforma Belagora.</p>
    </div>
  );
}

export default PainelPage;
