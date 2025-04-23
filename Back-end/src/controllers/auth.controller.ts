import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    res.status(201).json({ message: 'Usuário criado', user });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário' });
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
  res.json({ message: 'Você está logado!', user: req.user });
};
