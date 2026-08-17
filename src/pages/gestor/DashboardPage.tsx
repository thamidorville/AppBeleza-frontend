import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';

function DashboardPage() {
  const { token } = useAuth();
  const dados = getTokenData(token);

  return (
    <div>
      <h1>Oi, {dados?.nome}</h1>
      <p>Bem-vindo ao painel do seu estabelecimento.</p>
    </div>
  );
}

export default DashboardPage;
