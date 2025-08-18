import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Nome muito curto").optional(),
  profileImage: z.string().url("URL inválida").optional(),
});

export const oauthSchema = z.object({
  provider: z.enum(["google", "github"]),
  token: z.string().min(10, "Token inválido"),
});
