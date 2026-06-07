import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "@/lib/query-client";
import { Platform } from "react-native";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function apiCall(path: string, options: RequestInit = {}) {
  const base = getApiUrl();
  const url = new URL(path, base).toString();
  const res = await fetch(url, { ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("auth_token");
        if (stored) {
          const data = await apiCall("/api/auth/me", {
            headers: { Authorization: `Bearer ${stored}` },
          });
          setUser(data.user);
          setToken(stored);
        }
      } catch {
        await AsyncStorage.removeItem("auth_token");
      } finally {
        setIsLoading(false);
      }
    })();

    // Track app launch
    try {
      apiCall("/api/track/visit", {
        method: "POST",
        body: JSON.stringify({ platform: Platform.OS }),
      }).catch(() => {});
    } catch {}
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiCall("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem("auth_token", data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await apiCall("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem("auth_token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
