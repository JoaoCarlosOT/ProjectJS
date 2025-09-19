import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(5, "Descrição muito curta"),
  status: z.enum(["a_fazer", "em_progresso", "finalizado"]).default("a_fazer"),
  imageUrl: z.string().optional(), 
});

export type TodoInput = z.infer<typeof todoSchema>;
