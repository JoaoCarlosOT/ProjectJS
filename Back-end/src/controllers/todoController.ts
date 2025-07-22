import { Request, Response } from 'express';
import { Todo } from '../models/todo';
import { Op } from 'sequelize';

export const getAllTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const todos = await Todo.findAll({ where: { userId } });
  res.json(todos);
};

export const searchTodos = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const search = req.query.search as string;

  try {
    const todos = await Todo.findAll({
      where: {
        userId,
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ]
      }
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar todos com filtro', error });
  }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const { id } = req.params;
  const todo = await Todo.findOne({ where: { id, userId } });
  todo ? res.json(todo) : res.status(404).json({ message: 'Todo não encontrado' });
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description, userId });
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = await Todo.findOne({ where: { id, userId } });
  if (todo) {
    await todo.update({ title, description });
    res.json({ message: 'Atualizado com sucesso' });
  } else {
    res.status(404).json({ message: 'Todo não encontrado' });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const { id } = req.params;
  const todo = await Todo.findOne({ where: { id, userId } });
  if (todo) {
    await todo.destroy();
    res.json({ message: 'Todo deletado' });
  } else {
    res.status(404).json({ message: 'Todo não encontrado' });
  }
};
