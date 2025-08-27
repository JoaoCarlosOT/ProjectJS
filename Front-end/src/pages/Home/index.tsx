import { useEffect, useContext, useState, useRef } from 'react';
import Todos from '../../components/Todos';
import { Todo } from '../../types/Todo';
import api from '../../services/api';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { IoFilter, IoAddOutline } from "react-icons/io5";
import Loading from '../../components/Loading';
import SearchData from '../../services/SearchData';

const Home = () => {
    const { todos, setTodos, loading, setLoading, favorites } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>("");

    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await api.get<Todo[]>('/todos');
                setTodos(response.data);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        fetchTodos();
        setLoading(false);
    }, [setTodos]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open]);

    const handleDeleteTodo = (id: string) => {
        setTodos((prev: Todo[]) => prev.filter((todo) => todo.id !== id));
    };

    const handleFilter = async (filter: string) => {
        try {
            const searchQuery = filter === "all" ? "" : filter.toLowerCase().trim();
            if (searchQuery === "favoritos") {
                setTodos(favorites);
                return;
            }

            const data = await SearchData({ search: searchQuery });
            setTodos(data);
        } catch (error) {
            console.log("Erro ao buscar dados", error);
        } finally {
            setOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <div className='flex items-center justify-between mb-8 max-[500px]:flex-col max-[400px]:gap-3 max-[400px]:text-center'>
                <h1 className="text-2xl md:text-3xl text-texto font-bold text-center">Minhas Tarefas</h1>
                <div className='flex flex-row gap-1'>
                    <div ref={filterRef} className="w-[110px] h-[36px] sm:w-[120px] sm:h-[38px] md:w-[130px] md:h-[40px] bg-card flex items-center justify-center rounded-2xl text-texto font-semibold gap-2 border-[1px] border-slate-700 text-xs sm:text-base md:text-md" onClick={() => {
                        setOpen(prev => !prev);
                    }}>
                        <IoFilter className='text-[22px]' />
                        Filter
                        {open && (
                            <div className="absolute right-20 md:right-52 top-36 w-56 bg-card  border rounded shadow-lg z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 text-texto hover:bg-background"
                                    onClick={() => handleFilter("all")}
                                >
                                    All
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 text-texto hover:bg-background"
                                    onClick={() => handleFilter("favoritos")}
                                >
                                    Favoritos
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 text-texto hover:bg-background"
                                    onClick={() => {
                                        setSearch("a_fazer");
                                        handleFilter("a_fazer");
                                    }}
                                >
                                    A fazer
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 text-texto hover:bg-background"
                                    onClick={() => {
                                        setSearch("em_progresso");
                                        handleFilter("em_progresso");
                                    }}
                                >
                                    Em progresso
                                </button>

                                <button
                                    className="block w-full text-left px-4 py-2 text-texto hover:bg-background"
                                    onClick={() => {
                                        setSearch("finalizado");
                                        handleFilter("finalizado");
                                    }}
                                >
                                    Finalizados
                                </button>


                            </div>
                        )}
                    </div>

                    <Link to="/cadastrar" className="w-[110px] h-[36px] sm:w-[120px] sm:h-[38px] md:w-[130px] md:h-[40px] bg-button flex items-center justify-center rounded-2xl text-white font-semibold gap-2 border-[1px] text-xs sm:text-base md:text-md">
                        <IoAddOutline className='text-[22px] font-bold' />
                        New Task
                    </Link>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <Todos key={todo.id} Todo={todo} onDelete={handleDeleteTodo} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-texto text-lg font-medium">
                        Nenhum todo encontrado
                    </p>
                )}
            </div>

        </div >
    );
}

export default Home;
