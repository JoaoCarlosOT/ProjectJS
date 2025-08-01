import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Todo } from '../../types/Todo';

const TodoID = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await api.get<Todo>(`/todos/${id}`);
                setTodo(response.data);
            } catch (error) {
                console.error('Erro ao buscar o TODO:', error);
            }
        };
        fetchTodo();
    }, [id]);

    if (!todo) {
        return <p>Carregando...</p>;
    }

    // Corrige a URL da imagem, se for relativa
    const finalImageUrl = todo.imageUrl?.startsWith('http')
        ? todo.imageUrl
        : `${import.meta.env.VITE_API_URL}${todo.imageUrl}`;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Detalhes do TODO</h1>
            {todo.imageUrl && (
                <img
                    src={finalImageUrl}
                    alt="Imagem do TODO"
                    className="max-w-md w-[200px] rounded-lg mb-4"
                />
            )}
            <p className="text-lg text-gray-800 mb-2">
                <span className="font-semibold">Título:</span> {todo.title}
            </p>
            <p className="text-md text-gray-700">
                <span className="font-semibold">Descrição:</span> {todo.description}
            </p>
        </div>
    );
};

export default TodoID;
