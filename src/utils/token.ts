export interface TokenData {
  email: string;
  role: string;
  nome: string;
}

function decodeBase64Utf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

export function getTokenData(token: string | null): TokenData | null {
  if (!token) return null;

  try {
    const base64Payload = token.split('.')[1];
    const jsonString = decodeBase64Utf8(base64Payload);
    const payload = JSON.parse(jsonString);

    return {
      email: payload['email'] || '',
      role: payload['role'] || '',
      nome: payload['unique_name'] || '',
    };
  } catch {
    return null;
  }
}

export function getPrimeiroNome(token: string | null): string {
  const data = getTokenData(token);
  if (!data || !data.nome) return '';
  return data.nome.split(' ')[0];
}
