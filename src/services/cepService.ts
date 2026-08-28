import api from './api';
import type { DadosCep } from '../types/endereco';

export async function consultarCep(cep: string): Promise<DadosCep | null> {
  try {
    const response = await api.get(`/endereco/consulta-cep/${cep}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function obterMeuEndereco(): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await api.get('/endereco/meu-endereco');
    const data = response.data;
    if (data.latitude && data.longitude) {
      return { latitude: data.latitude, longitude: data.longitude };
    }
    return null;
  } catch {
    return null;
  }
}
