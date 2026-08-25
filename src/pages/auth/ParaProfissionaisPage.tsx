import { Link } from 'react-router-dom';

function ParaProfissionaisPage() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.titulo}>Belagora para Profissionais</h1>
        <p style={styles.subtitulo}>
          Gerencie seu salão, seus serviços e sua equipe em um só lugar.
          Seus clientes encontram você e agendam com poucos cliques.
        </p>
      </div>

      <div style={styles.beneficios}>
        <div style={styles.card}>
          <h3 style={styles.cardTitulo}>Agenda Inteligente</h3>
          <p style={styles.cardTexto}>
            Publique seus horários disponíveis e receba agendamentos automaticamente.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitulo}>Gestão de Equipe</h3>
          <p style={styles.cardTexto}>
            Cadastre seus funcionários, vincule serviços e organize a rotina do salão.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitulo}>Visibilidade</h3>
          <p style={styles.cardTexto}>
            Clientes encontram seus serviços por geolocalização. Abriu, achou, agendou.
          </p>
        </div>
      </div>

      <div style={styles.cta}>
        <h2 style={styles.ctaTitulo}>Quer usar o Belagora no seu salão?</h2>
        <p style={styles.ctaTexto}>Entre em contato e comece a gerenciar sua agenda hoje.</p>
        <a
          href="https://wa.me/5521990650338?text=Olá! Quero saber mais sobre o Belagora para meu salão."
          target="_blank"
          rel="noopener noreferrer"
          style={styles.botaoWhatsapp}
        >
          Falar no WhatsApp
        </a>
      </div>

      <p style={styles.voltarTexto}>
        <Link to="/login" style={styles.voltarLink}>← Voltar para login</Link>
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '60px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hero: {
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '48px',
  },
  titulo: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
  },
  subtitulo: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.6',
  },
  beneficios: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '48px',
    maxWidth: '900px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    width: '260px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardTitulo: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: '8px',
  },
  cardTexto: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.5',
  },
  cta: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  ctaTitulo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  },
  ctaTexto: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '20px',
  },
  botaoWhatsapp: {
    display: 'inline-block',
    padding: '14px 32px',
    borderRadius: '8px',
    backgroundColor: '#25d366',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  voltarTexto: {
    marginTop: '24px',
  },
  voltarLink: {
    color: '#7c3aed',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default ParaProfissionaisPage;
