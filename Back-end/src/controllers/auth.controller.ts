import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { sendWelcomeEmail } from '../services/sendEmail'; 
import { registerSchema, loginSchema, updateProfileSchema } from "../schemas/userSchema";
import fs from 'fs';
import path from 'path';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = registerSchema.parse(req.body);
    const { name, email, password } = parsed;
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'Imagem de perfil é obrigatória' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      profileImage: file.filename,
      provider: "local",
    });

    if (user) {
      sendWelcomeEmail(email).catch((err) => {
        console.error("Erro ao enviar e-mail de boas-vindas:", err);
      });
    }

    const token = jwt.sign(
      { id: user.getDataValue('id'), email },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user });
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ message: error.errors.map((e: any) => e.message) });
    } else {
      console.error("Erro ao criar usuário:", error);
      res.status(400).json({ message: 'Erro ao criar usuário' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.parse(req.body);
    const { email, password } = parsed;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Usuário não encontrado" });
      return;
    }

    if (!user.password) {
      res.status(400).json({ message: "Senha não cadastrada" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({ message: "Senha inválida" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    res.json({ message: "Logado com sucesso", token });
  } catch (error: any) {
    if (error.errors) {
      res
        .status(400)
        .json({ message: error.errors.map((e: any) => e.message) });
    } else {
      console.error("Erro ao fazer login:", error);
      res.status(400).json({ message: "Erro ao fazer login" });
    }
  }
};

export const loginWithGoogle = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: 'Token do Google não fornecido' });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(400).json({ message: 'Token inválido ou sem email' });
      return;
    }

    const email = payload.email;
    const name = payload.name || '';
    const picture = payload.picture || '';

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        password: "",
        profileImage: picture,
        name,
        provider: "google",
      });
      
      if (user) {
        sendWelcomeEmail(email).catch((err) => {
          console.error("Erro ao enviar e-mail de boas-vindas:", err);
        });
      }
    }

    const yourToken = jwt.sign(
      { id: user.getDataValue('id'), email },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.json({ token: yourToken, user });
  } catch (error) {
    console.error('Erro ao verificar token do Google:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

export const home = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.user!.id);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error("Erro no /home:", error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = updateProfileSchema.parse(req.body);
    const userId = (req.user as any).id;
    const { name } = parsed;
    const file = req.file;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    if (name) user.name = name;

    if (file) {
      if (user.profileImage) {
        const oldPath = path.join(__dirname, `../uploads/user/${user.profileImage}`);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      user.profileImage = file.filename;
    }

    await user.save();

    res.json({ message: 'Perfil atualizado com sucesso', user });
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};
