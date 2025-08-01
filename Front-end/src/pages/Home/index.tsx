import { useEffect, useContext } from 'react'
import Todos from '../../components/Todos';
import { Todo } from '../../types/Todo';
import api from '../../services/api';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { IoFilter, IoAddOutline } from "react-icons/io5";

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
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <div className='flex items-center justify-between mb-8'>
                <h1 className="text-3xl text-texto font-bold text-center">Minhas Tarefas</h1>
                <div className='flex flex-row gap-1'>
                    <Link to="" className="w-[130px] h-[40px] bg-card flex items-center justify-center rounded-2xl text-texto font-semibold gap-2 border-[2px]">
                        <IoFilter className='text-[22px]' />
                        Filter
                    </Link>
                    <Link to="/cadastrar" className="w-[130px] h-[40px] bg-button flex items-center justify-center rounded-2xl text-white font-semibold gap-2">
                        <IoAddOutline className='text-[22px] font-bold' />
                        New Task
                    </Link>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {todos.map((todo) => (
                    <Todos key={todo.id} Todo={todo} onDelete={handleDeleteTodo} />
                ))}
            </div>
        </div>
    );
}

export default Home;