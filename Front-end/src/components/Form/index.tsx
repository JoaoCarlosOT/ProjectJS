import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import api from "../../services/api";
import { useMessage } from '../../context/FlashMessageContext';

type FormProps = {
    initialData?: Todo;
    isEditing?: boolean;
};

const Form = ({ initialData, isEditing = false }: FormProps) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setMessage } = useMessage();

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);

            if (initialData.imageUrl) {
                const isFullUrl = initialData.imageUrl.startsWith("http");
                const fullUrl = isFullUrl
                    ? initialData.imageUrl
                    : `${import.meta.env.VITE_API_URL}${initialData.imageUrl}`;
                setPreviewUrl(fullUrl);
            }
        }
    }, [initialData]);

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            if (file) formData.append("file", file);

            let res;
            if (isEditing && initialData?.id) {
                res = await api.put(`/todos/${initialData.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                res = await api.post("/todos", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            const msg = res.data.message || (isEditing ? "Atualizado!" : "Cadastrado!");
            setMessage({ type: "success", text: msg });
            navigate("/");
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao salvar tarefa";
            setMessage({ type: "error", text: msg });
        }
    };

    return (
        <form
            className="max-w-md w-full mx-auto mt-32 p-6 bg-white rounded-2xl shadow-md space-y-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Descrição</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Imagem (opcional)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-4 max-h-64 object-contain rounded-lg border border-gray-300"
                    />
                )}
            </div>

            <input
                type="submit"
                value={isEditing ? "Atualizar" : "Cadastrar"}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            />
        </form>
    );
};

export default Form;

