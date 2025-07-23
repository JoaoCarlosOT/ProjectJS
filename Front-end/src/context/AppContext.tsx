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
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
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
            setUser
        }}>
            {children}
        </AppContext.Provider>
    );
};
