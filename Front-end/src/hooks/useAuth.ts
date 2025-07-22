
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthResponse } from '../types/auth';

export default function useAuth() {
    const navigate = useNavigate();
    const { setAuthenticated } = useContext(AppContext);

    async function register(user: FormData) {
        try {
            const response = await api.post<AuthResponse>("/register", user, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            const data = response.data;
            localStorage.setItem("token", JSON.stringify(data.token));
            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            setAuthenticated(true);
            navigate("/");
            return data;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        }
    }

    return { register };
}
