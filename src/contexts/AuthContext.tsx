import { createContext, useState } from 'react';
import { UserResource } from '../resources';

interface IAuthContext {
  user: UserResource | null;
  setUser: (user: UserResource | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserResource | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
