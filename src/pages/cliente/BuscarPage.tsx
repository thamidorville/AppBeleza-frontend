import { useAuth } from '../../contexts/AuthContext';
import { getTokenData } from '../../utils/token';

function BuscarPage() {
  const { token } = useAuth();
  const dados = getTokenData(token);

  return (
    <div>
      <h1>Oi, {dados?.nome}</h1>
      <p>Encontre serviços de beleza disponíveis perto de você.</p>
    </div>
  );
}

export default BuscarPage;
