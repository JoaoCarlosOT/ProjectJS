import { RiDeleteBin7Fill } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { Todo } from '../../types/Todo.ts';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.tsx';
import api from "../../services/api.ts";
import { useMessage } from '../../context/FlashMessageContext';

interface Props {
    Todo: Todo;
    onDelete: (id: string) => void;
    mostrarAcoes?: boolean;
}

const Todos = ({ Todo, onDelete, mostrarAcoes = true }: Props) => {
    const { id, title, imageUrl, status } = Todo;
    const { toggleFavorite, isFavorite } = useContext(AppContext);
    const { setMessage } = useMessage();
    const favoritado = isFavorite(id);

    const finalImageUrl = imageUrl
        ? (imageUrl.startsWith("http")
            ? imageUrl
            : `${import.meta.env.VITE_API_URL}${imageUrl}`)
        : "/defaultTodo.jpg";

    const handleDelete = async (id: string) => {
        try {
            const res = await api.delete(`/todos/${id}`);
            setMessage({ type: "success", text: res.data.message || "Deletado com sucesso!" });
            onDelete(id);
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao deletar";
            setMessage({ type: "error", text: msg });
        }
    };

    return (
        <div className="relative group bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300">
            <div className="absolute top-2 right-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <FaHeart
                    className={`text-xl cursor-pointer ${favoritado ? 'text-red-600' : 'text-gray-400'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(Todo);
                        setMessage({
                            type: "success",
                            text: favoritado
                                ? "Removido dos favoritos!"
                                : "Adicionado aos favoritos!"
                        });
                    }}
                />
            </div>

            <Link to={`/details/${id}`} className="block h-full">
                {finalImageUrl && (
                    <img src={finalImageUrl} alt={title} className="w-full h-80 object-cover" />
                )}

                <div className="p-4 space-y-2">
                    <h2 className="text-lg font-bold text-texto flex items-center gap-2">
                        <span
                            className={`inline-block w-3 h-3 rounded-full
        ${status === "a_fazer" ? "bg-gray-100" :
                                    status === "em_progresso" ? "bg-indigo-300" :
                                        "bg-gray-900"
                                }`}
                        />
                        {title}
                    </h2>
                </div>


            </Link>

            {mostrarAcoes && (
                <div className="absolute bottom-5 right-2 flex gap-4 text-xl z-10">
                    <RiDeleteBin7Fill
                        className="text-texto cursor-pointer"
                        onClick={() => handleDelete(id)}
                    />
                    <Link to={`/edit/${id}`}>
                        <LuPencil className="text-texto cursor-pointer" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Todos;
