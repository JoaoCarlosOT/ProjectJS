import { useEffect, useContext } from 'react'
import Todos from '../../components/Todos';
import { Todo } from '../../types/Todo';
import api from '../../services/api';
import { AppContext } from '../../context/AppContext';

const Home = () => {
    const { todos, setTodos } = useContext(AppContext);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await api.get<Todo[]>('/todos');
                setTodos(response.data);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        fetchTodos();
    }, [setTodos]);

    const handleDeleteTodo = (id: string) => {
        setTodos((prev: Todo[]) => prev.filter((todo) => todo.id !== id));
    };


    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
            <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-3 text-center">Título</th>
                        <th className="p-3 text-center">Descrição</th>
                        <th className="p-3 text-center">Deletar</th>
                        <th className="p-3 text-center">Editar</th>
                        <th className="p-3 text-center">Details</th>
                        <th className="p-3 text-center">favoritar</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                            <Todos Todo={todo} onDelete={handleDeleteTodo} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;