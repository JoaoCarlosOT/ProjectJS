import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: 'Imagem de perfil é obrigatória' });
    return;
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
      profileImage: file.filename,
    });

    const token = jwt.sign(
      { id: user.getDataValue('id'), email },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({ message: 'Erro ao criar usuário' });
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

    // Verificar se o usuário já existe
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Cria o usuário se não existir
      user = await User.create({
        email,
        password: '', // senha vazia, pois não é usada
        profileImage: picture,
        name,
      });
    }

    // Gera token da sua API
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(400).json({ message: 'Usuário não encontrado' });
    return;
  }

  const match = await bcrypt.compare(password, user.getDataValue('password'));

  if (!match) {
    res.status(400).json({ message: 'Senha inválida' });
    return;
  }

  const token = jwt.sign(
    { id: user.getDataValue('id'), email },
    process.env.JWT_SECRET || '',
    { expiresIn: '1h' }
  );

  res.json({ message: 'Logado com sucesso', token });
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
  const userId = (req.user as any).id;
  const { name } = req.body;
  const file = req.file;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    if (name) user.name = name;
    if (file) user.profileImage = file.filename;

    await user.save();

    res.json({ message: 'Perfil atualizado com sucesso', user });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};
