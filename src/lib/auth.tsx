import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { students, Student } from "@/data/students";

type AuthState = {
  user: Student | null;
  login: (matricNo: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  loading: boolean;
};

const AuthCtx = createContext<AuthState | null>(null);
const KEY = "src_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = (matricNo: string, password: string) => {
    const m = matricNo.trim().toUpperCase();
    const found = students.find((s) => s.matricNo.toUpperCase() === m);
    if (!found) return { ok: false, error: "Matric number not found" };
    if (found.password !== password) return { ok: false, error: "Incorrect password" };
    setUser(found);
    localStorage.setItem(KEY, JSON.stringify(found));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };

  return <AuthCtx.Provider value={{ user, login, logout, loading }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
