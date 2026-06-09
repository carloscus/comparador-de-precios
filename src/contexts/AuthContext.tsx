import React, { useState, ReactNode } from 'react';
import { AuthContext } from './auth';

const SESSION_KEY = 'g360_session';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000;

interface SessionData {
  isLoggedIn: boolean;
  userName: string | null;
  userEmail: string | null;
  timestamp: number;
}

const readSession = (): SessionData | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data: SessionData = JSON.parse(raw);
    if (Date.now() - data.timestamp > SESSION_EXPIRY_MS) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const writeSession = (data: Omit<SessionData, 'timestamp'>) => {
  const session: SessionData = { ...data, timestamp: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionData | null>(() => readSession());

  const login = (name: string, email: string) => {
    const data = { isLoggedIn: true, userName: name, userEmail: email };
    writeSession(data);
    setSession({ ...data, timestamp: Date.now() });
  };

  const logout = () => {
    clearSession();
    setSession(null);
  };

  const isLoggedIn = session?.isLoggedIn ?? false;
  const userName = session?.userName ?? null;
  const userEmail = session?.userEmail ?? null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
