import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AuthContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface User {
  name: string;
  email: string;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {}
});

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
