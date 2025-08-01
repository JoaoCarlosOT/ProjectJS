import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
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
    const { id, title, description, imageUrl } = Todo;
    const { toggleFavorite, isFavorite } = useContext(AppContext);
    const { setMessage } = useMessage();
    const favoritado = isFavorite(id);

    const finalImageUrl = imageUrl?.startsWith("http")
        ? imageUrl
        : `${import.meta.env.VITE_API_URL}${imageUrl}`;

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
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition">
            {finalImageUrl && (
                <img src={finalImageUrl} alt={title} className="w-full h-80 object-cover" />
            )}

            <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-blue-700">{title}</h2>
                <p className="text-gray-600 text-sm">{description}</p>

                {mostrarAcoes && (
                    <div className="flex justify-between items-center mt-4 text-xl">
                        <RiDeleteBin7Fill className="text-blue-700 cursor-pointer" onClick={() => handleDelete(id)} />
                        <Link to={`/edit/${id}`}><LuPencil className="text-yellow-500 cursor-pointer" /></Link>
                        <Link to={`/details/${id}`}><MdOutlineSearch className="text-green-700 cursor-pointer" /></Link>
                        <FaHeart
                            className={`cursor-pointer transition ${favoritado ? 'text-red-600' : 'text-gray-400'}`}
                            onClick={() => {
                                toggleFavorite(Todo);
                                setMessage({ type: "success", text: favoritado ? "Removido dos favoritos!" : "Adicionado aos favoritos!" });
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};


export default Todos;
