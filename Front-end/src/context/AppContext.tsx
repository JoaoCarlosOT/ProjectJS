// context/AppContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import api from '../services/api';
import { AuthResponse } from '../types/auth';

interface AppContextType {
    favorites: Todo[];
    toggleFavorite: (todo: Todo) => void;
    isFavorite: (id: string | number) => boolean;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    register: (user: FormData) => Promise<AuthResponse | null>;
    login: (credentials: { email: string; password: string }) => Promise<AuthResponse | null>;
}

export const AppContext = createContext<AppContextType>({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
    todos: [],
    setTodos: () => { },
    authenticated: false,
    setAuthenticated: () => { },
    register: async () => null,
    login: async () => null,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setAuthenticated(true);
            } catch (error) {
                console.error("Erro ao analisar token:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const register = async (user: FormData): Promise<AuthResponse | null> => {
        try {
            const response = await api.post("/register", user, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const data: AuthResponse = response.data;
            localStorage.setItem("token", data.token);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            setAuthenticated(true);
            return data;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        }
    };

    const login = async (
        credentials: { email: string; password: string }
    ): Promise<AuthResponse | null> => {
        try {
            const response = await api.post("/login", credentials);
            const data: AuthResponse = response.data;

            localStorage.setItem("token", data.token);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            setAuthenticated(true);
            return data;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

    const toggleFavorite = (todo: Todo) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === todo.id)
                ? prev.filter((fav) => fav.id !== todo.id)
                : [...prev, todo]
        );
    };

    const isFavorite = (id: string | number) =>
        favorites.some((fav) => fav.id === id);

    return (
        <AppContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            todos,
            setTodos,
            authenticated,
            setAuthenticated,
            register,
            login
        }}>
            {children}
        </AppContext.Provider>
    );
};
