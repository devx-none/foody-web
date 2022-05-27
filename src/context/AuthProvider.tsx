import { createContext, useState } from 'react';

interface AuthInterface {
  token?: string;
  role?: string;
}

interface AuthContextInterface {
  auth: AuthInterface;
  setAuth: (auth: AuthInterface) => void;
  persist: string;
  setPersist: (persist: string) => void;
}

const AuthContext = createContext<AuthContextInterface>({
  auth: {},
  setAuth: () => {},
  persist: 'false',
  setPersist: () => {},
});

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<AuthInterface>({});
  const [persist, setPersist] = useState<string>((localStorage.getItem('persist') === 'true' && 'true') || 'false');

  return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
