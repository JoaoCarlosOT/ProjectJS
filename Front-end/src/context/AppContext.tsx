// context/AppContext.tsx
import React, { createContext, useState } from 'react';
import { Todo } from '../types/Todo';

interface AppContextType {
    favorites: Todo[];
    toggleFavorite: (todo: Todo) => void;
    isFavorite: (id: string | number) => boolean;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
}

export const AppContext = createContext<AppContextType>({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
    todos: [],
    setTodos: () => { }
});


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);

    const toggleFavorite = (todo: Todo) => {
        const isFavorited = favorites.some((fav) => fav.id === todo.id);
        if (isFavorited) {
            setFavorites((prev) => prev.filter((fav) => fav.id !== todo.id));
        } else {
            setFavorites((prev) => [...prev, todo]);
        }
    };

    const isFavorite = (id: string | number) => {
        return favorites.some((fav) => fav.id === id);
    };

    return (
        <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite, todos, setTodos }}>
            {children}
        </AppContext.Provider>
    );
};
