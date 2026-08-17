import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextData {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      setToken(savedToken);
      setRole(extractRoleFromToken(savedToken));
    }
  }, []);

  function extractRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['role'] || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch {
      return null;
    }
  }

  function login(newToken: string) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setRole(extractRoleFromToken(newToken));
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
