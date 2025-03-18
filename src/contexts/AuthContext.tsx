import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  session: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<boolean>(false);

  const signIn = async (email: string, password: string) => {
    // Demo authentication - accept any credentials
    if (email && password) {
      setSession(true);
      return;
    }
    throw new Error('Invalid credentials');
  };

  const signOut = async () => {
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}