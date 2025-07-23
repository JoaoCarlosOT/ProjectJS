// hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthResponse } from "../types/auth";
import { User } from "../types/User";

export default function useAuth() {
  const navigate = useNavigate();
  const { setAuthenticated, setUser } = useContext(AppContext);

  async function register(user: FormData) { 
    try {
      const response = await api.post<AuthResponse>("/register", user, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setAuthenticated(true);
      const userRes = await api.get<{ user: User }>("/home");
      setUser(userRes.data.user);
      navigate("/");
      return data;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    }
  }

  async function loginWithGoogle(googleToken: string) {
    try {
      const response = await api.post<AuthResponse>('/auth/google', { token: googleToken });

      const data = response.data;

      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      setAuthenticated(true);
      const userRes = await api.get<{ user: User }>("/home");
      setUser(userRes.data.user);

      navigate("/");
    } catch (error) {
      console.error("Erro no login com Google:", error);
    }
  }

  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await api.post<AuthResponse>("/login", credentials);
      const data = response.data;
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setAuthenticated(true);
      const userRes = await api.get<{ user: User }>("/home");
      setUser(userRes.data.user);
      navigate("/");
      return data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setAuthenticated(false);
    setUser(null);
    navigate("/login");
  }

  return { register,loginWithGoogle, login, logout };
}
