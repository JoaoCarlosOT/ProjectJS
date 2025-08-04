import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { Todo } from '../types/Todo';
import { User } from '../types/User';


interface AppContextType {
    favorites: Todo[];
    toggleFavorite: (todo: Todo) => void;
    isFavorite: (id: string | number) => boolean;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    todoStats: {
        total: number;
        aFazer: number;
        emProgresso: number;
        finalizados: number;
    };
}

export const AppContext = createContext<AppContextType>({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
    todos: [],
    setTodos: () => { },
    authenticated: false,
    setAuthenticated: () => { },
    user: null,
    setUser: () => { },
    todoStats: {
        total: 0,
        aFazer: 0,
        emProgresso: 0,
        finalizados: 0
    }
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const todoStats = {
        total: todos.length,
        aFazer: todos.filter(todo => todo.status === 'a_fazer').length,
        emProgresso: todos.filter(todo => todo.status === 'em_progresso').length,
        finalizados: todos.filter(todo => todo.status === 'finalizado').length,
    };
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAuthenticated(true);
            api.get<{ user: User }>('/home')
                .then(res => setUser(res.data.user))
                .catch(() => {
                    localStorage.removeItem('token');
                    setAuthenticated(false);
                });
        }
    }, []);

    const toggleFavorite = (todo: Todo) => {
        setFavorites(prev =>
            prev.some(fav => fav.id === todo.id)
                ? prev.filter(fav => fav.id !== todo.id)
                : [...prev, todo]
        );
    };

    const isFavorite = (id: string | number) =>
        favorites.some(fav => fav.id === id);

    return (
        <AppContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            todos,
            setTodos,
            authenticated,
            setAuthenticated,
            user,
            setUser,
            todoStats,
        }}>
            {children}
        </AppContext.Provider>
    );
};
