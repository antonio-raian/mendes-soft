import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '@/services/api';

export interface Credentials {
  username: string;
  password: string;
}

interface AuthContextData {
  loading: boolean;
  user: object;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  user: object;
  token: string;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@posto7:token');
    const user = localStorage.getItem('@posto7:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }: Credentials) => {
    try {
      setLoading(true);

      const response = await api.post('/login', {
        username,
        password,
      });

      const { user, token: jwt } = response.data;

      localStorage.setItem('@posto7:token', jwt.token);
      localStorage.setItem('@posto7:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${jwt.token}`;

      setData({ user, token: jwt.token });
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@posto7:token');
    localStorage.removeItem('@posto7:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
