import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(5, "Descrição muito curta"),
  imageUrl: z.string().optional(),
  status: z.enum(["a_fazer", "em_progresso", "finalizado"]).default("a_fazer"),
});

export type TodoInput = z.infer<typeof todoSchema>;