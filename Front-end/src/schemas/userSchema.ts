import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(4, "Senha inválida"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Nome muito curto").optional(),
  profileImage: z.string("URL inválida").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
