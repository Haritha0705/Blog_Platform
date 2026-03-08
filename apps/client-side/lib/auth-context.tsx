'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { LOGIN_MUTATION, REGISTER_MUTATION, GET_ME } from '@/lib/graphql/operations';

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [loginMutation] = useMutation<AnyData>(LOGIN_MUTATION);
  const [registerMutation] = useMutation<AnyData>(REGISTER_MUTATION);
  const [fetchMe] = useLazyQuery<AnyData>(GET_ME);

  // Restore session on mount
  useEffect(() => {
    let mounted = true;
    const restore = async () => {
      const token = localStorage.getItem('blog_token');
      const userId = localStorage.getItem('blog_user_id');
      if (token && userId) {
        try {
          const res = await fetchMe({ variables: { userId: parseInt(userId) } });
          if (mounted && res.data?.me) {
            setUser(res.data.me);
          } else if (mounted) {
            localStorage.removeItem('blog_token');
            localStorage.removeItem('blog_user_id');
          }
        } catch {
          if (mounted) {
            localStorage.removeItem('blog_token');
            localStorage.removeItem('blog_user_id');
          }
        }
      }
      if (mounted) setLoading(false);
    };
    restore();
    return () => { mounted = false; };
  }, [fetchMe]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { loginInput: { email, password } },
      });

      if (data?.login) {
        localStorage.setItem('blog_token', data.login.accessToken);
        localStorage.setItem('blog_user_id', data.login.user.id.toString());
        setUser(data.login.user);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      return { success: false, error: message };
    }
  }, [loginMutation]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const { data } = await registerMutation({
        variables: { registerInput: { name, email, password } },
      });

      if (data?.register) {
        localStorage.setItem('blog_token', data.register.accessToken);
        localStorage.setItem('blog_user_id', data.register.user.id.toString());
        setUser(data.register.user);
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      return { success: false, error: message };
    }
  }, [registerMutation]);

  const logout = useCallback(() => {
    localStorage.removeItem('blog_token');
    localStorage.removeItem('blog_user_id');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
