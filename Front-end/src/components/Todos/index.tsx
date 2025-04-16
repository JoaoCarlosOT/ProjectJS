import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { Todo } from '../../types/Todo.ts';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.tsx';

interface Props {
    Todo: Todo;
    onDelete: (id: string) => void;
    mostrarAcoes?: boolean;
}

const Todos = ({ Todo, onDelete, mostrarAcoes = true }: Props) => {
    const { id, title, description } = Todo;
    const { toggleFavorite, isFavorite } = useContext(AppContext);
    const favoritado = isFavorite(id);

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(() => {
                alert("Deletado com sucesso");
                onDelete(id);
            })
            .catch((error) => {
                console.log('Erro ao deletar', error);
            });
    };

    return (
        <>
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
                        alert("favoritado com sucesso!!!")
                    }}
                />
            </td>
        </>
    );
};


export default Todos;
