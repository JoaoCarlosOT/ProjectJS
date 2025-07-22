import React, { createContext, useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import api from '../services/api';

interface AppContextType {
    favorites: Todo[];
    toggleFavorite: (todo: Todo) => void;
    isFavorite: (id: string | number) => boolean;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
    todos: [],
    setTodos: () => { },
    authenticated: false,
    setAuthenticated: () => { },
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
            setAuthenticated
        }}>
            {children}
        </AppContext.Provider>
    );
};
