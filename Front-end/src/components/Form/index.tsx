import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../../types/Todo'
import api from "../../services/api";

type FormProps = {
    initialData?: Todo;
    isEditing?: boolean;
};

const Form = ({ initialData, isEditing = false }: FormProps) => {
    const [title, setTitle] = useState<string>(initialData?.title || "");
    const [description, setDescription] = useState<string>(initialData?.description || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (isEditing && initialData?.id) {
                await api.put(`/todos/${initialData.id}`, {
                    title,
                    description
                });

                alert("editado com sucesso!");
                navigate("/");

            } else {
                await api.post("/todos", {
                    title,
                    description
                });

                alert("Cadastrado com sucesso!");
                navigate("/");
            }

        } catch (error) {
            console.log("Erro ao cadastrar/editar todo:");
        }
    };

    return (
        <form
            className="max-w-md w-full mx-auto mt-32 p-6 bg-white rounded-2xl shadow-md space-y-4"
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                    Description
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <input
                type="submit"
                value={isEditing ? "Atualizar" : "Cadastrar"}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
            />
        </form>
    )
}

export default Form;
