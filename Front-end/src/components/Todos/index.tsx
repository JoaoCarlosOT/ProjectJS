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
        <>
            <td className="p-3 text-center">
                {imageUrl && (
                    <img
                        src={finalImageUrl}
                        alt="Todo"
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                    />
                )}
            </td>
            <td className="p-3 text-center">{title}</td>
            <td className="p-3 text-center">{description}</td>

            {mostrarAcoes && (
                <>
                    <td>
                        <RiDeleteBin7Fill className="text-blue-700 cursor-pointer m-auto" onClick={() => handleDelete(id)} />
                    </td>
                    <td>
                        <Link to={`/edit/${id}`}><LuPencil className="text-yellow-500 cursor-pointer m-auto" /></Link>
                    </td>
                    <td>
                        <Link to={`/details/${id}`}><MdOutlineSearch className="text-green-700 cursor-pointer m-auto" /></Link>
                    </td>
                </>
            )}

            <td>
                <FaHeart
                    className={`m-auto cursor-pointer transition ${favoritado ? 'text-red-600' : 'text-gray-400'}`}
                    onClick={() => {
                        toggleFavorite(Todo);
                        setMessage({ type: "success", text: favoritado ? "Removido dos favoritos!" : "Adicionado aos favoritos!" });
                    }}
                />
            </td>
        </>
    );
};

export default Todos;
