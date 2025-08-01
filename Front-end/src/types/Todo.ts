export interface Todo {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    status: "a_fazer" | "em_progresso" | "finalizado";
}