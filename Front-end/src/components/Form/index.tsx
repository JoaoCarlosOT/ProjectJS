import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../../types/Todo";
import api from "../../services/api";
import { useMessage } from "../../context/FlashMessageContext";
import { todoSchema, TodoInput } from "../../schemas/todoSchema";

type FormProps = {
    initialData?: Todo;
    isEditing?: boolean;
};

const Form = ({ initialData, isEditing = false }: FormProps) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [status, setStatus] = useState<TodoInput["status"]>(
        initialData?.status || "a_fazer"
    );
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof TodoInput, string>>>(
        {}
    );

    const navigate = useNavigate();
    const { setMessage } = useMessage();

    useEffect(() => {
        if (initialData?.imageUrl) {
            const isFullUrl = initialData.imageUrl.startsWith("http");
            const fullUrl = isFullUrl
                ? initialData.imageUrl
                : `${import.meta.env.VITE_API_URL}/uploads/todo/${initialData.imageUrl}`;
            setPreviewUrl(fullUrl);
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

        const validation = todoSchema.safeParse({
            title,
            description,
            status,
        });

        if (!validation.success) {
            const fieldErrors: any = {};
            validation.error.issues.forEach((err) => {
                if (err.path[0]) fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("status", status);
            if (file) formData.append("profileImage", file);

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
            className="max-w-md w-full mx-auto mt-20 p-6 bg-card text-texto rounded-2xl shadow-md space-y-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4 py-2 border bg-card border-gray-300 rounded-lg"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Descrição</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-4 py-2 border bg-card border-gray-300 rounded-lg"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Status</label>
                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value as "a_fazer" | "em_progresso" | "finalizado")
                    }
                    className="px-4 py-2 border bg-card border-gray-300 rounded-lg"
                >
                    <option value="a_fazer">A Fazer</option>
                    <option value="em_progresso">Em Progresso</option>
                    <option value="finalizado">Finalizado</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">
                    Imagem (opcional)
                </label>
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
