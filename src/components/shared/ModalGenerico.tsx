import { useState } from 'react';

interface ModalGenericoProps {
  aberto: boolean;
  titulo: string;
  mensagem?: string;
  comInput?: boolean;
  inputObrigatorio?: boolean;
  placeholderInput?: string;
  textoBotaoConfirmar?: string;
  aoConfirmar: (valor?: string) => void;
  aoFechar: () => void;
}

function ModalGenerico({
  aberto,
  titulo,
  mensagem,
  comInput = false,
  inputObrigatorio = false,
  placeholderInput = '',
  textoBotaoConfirmar = 'Confirmar',
  aoConfirmar,
  aoFechar,
}: ModalGenericoProps) {
  const [valor, setValor] = useState('');

  if (!aberto) return null;

  function handleConfirmar() {
    if (comInput && inputObrigatorio && valor.trim() === '') return;
    aoConfirmar(comInput ? valor.trim() : undefined);
    setValor('');
  }

  function handleFechar() {
    setValor('');
    aoFechar();
  }

  return (
    <div style={styles.overlay} onClick={handleFechar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.titulo}>{titulo}</h2>
        {mensagem && <p style={styles.mensagem}>{mensagem}</p>}

        {comInput && (
          <textarea
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder={placeholderInput}
            style={styles.textarea}
            rows={3}
          />
        )}

        <div style={styles.botoes}>
          <button type="button" onClick={handleFechar} style={styles.botaoCancelar}>
            Cancelar
          </button>
          <button type="button" onClick={handleConfirmar} style={styles.botaoConfirmar}>
            {textoBotaoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '32px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  titulo: {
    marginBottom: '12px',
    color: '#1f2937',
    fontSize: '20px',
  },
  mensagem: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '16px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    resize: 'vertical',
    marginBottom: '16px',
    boxSizing: 'border-box',
  },
  botoes: {
    display: 'flex',
    gap: '12px',
  },
  botaoCancelar: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
  },
  botaoConfirmar: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default ModalGenerico;
