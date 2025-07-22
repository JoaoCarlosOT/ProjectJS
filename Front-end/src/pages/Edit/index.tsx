import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Form from "../../components/Form";
import { Todo } from "../../types/Todo";

const Edit = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        api.get<Todo>(`/todos/${id}`)
            .then((response) => setTodo(response.data))
            .catch((error) => console.log("Erro ao carregar tarefa", error));
    }, [id]);

    if (!todo) {
        return <div className="text-center mt-20">Carregando tarefa...</div>;
    }

    return <Form initialData={todo} isEditing />;
};

export default Edit;
