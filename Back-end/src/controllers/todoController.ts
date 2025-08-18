import { Request, Response } from 'express';
import { Todo } from '../models/todo';
import { Op } from 'sequelize';
import { todoSchema } from '../../schemas/todoSchema';
import { z } from 'zod';

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

export const createTodo = async (req: Request, res: Response) => {
  try {
    const parsed = todoSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const userId = (req.user as any).id;
    const filePath = req.file ? `/uploads/todo/${req.file.filename}` : null;

    const todo = await Todo.create({
      ...parsed.data,
      userId,
      imageUrl: filePath || parsed.data.imageUrl || null,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tarefa.' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Tarefa não encontrada' });

    const parsed = todoSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    Object.assign(todo, parsed.data);

    if (req.file) {
      todo.imageUrl = `/uploads/todo/${req.file.filename}`;
    }

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
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
