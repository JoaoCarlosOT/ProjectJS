import { Request, Response } from 'express';
import { Todo } from '../models/todo';
import { Op } from 'sequelize';
import { todoSchema } from '../schemas/todoSchema';
import fs from 'fs';
import path from 'path';

export const getAllTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const todos = await Todo.findAll({ where: { userId } });
  res.json(todos);
};

export const searchTodos = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const search = req.body.search as string;

  try {
    const todos = await Todo.findAll({
      where: {
        userId,
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } }
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
    const { title, description, status } = req.body;
    const userId = (req.user as any).id;

    if (!req.file) {
      res.status(400).json({ message: 'Imagem da tarefa é obrigatória' });
      return;
    }

    const todo = await Todo.create({
      title,
      description,
      status,
      userId,
      imageUrl: req.file.filename, 
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar tarefa.' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).id;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    const parsed = todoSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.issues });
      return;
    }

    if (parsed.data.title) todo.title = parsed.data.title;
    if (parsed.data.description) todo.description = parsed.data.description;
    if (parsed.data.status) todo.status = parsed.data.status;

    if (req.file) {
      if (todo.imageUrl) {
        const oldPath = path.join(__dirname, `../uploads/todo/${todo.imageUrl}`);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      todo.imageUrl = req.file.filename;
    }

    await todo.save();
    res.json({ message: "Tarefa atualizada com sucesso", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const { id } = req.params;
  const todo = await Todo.findOne({ where: { id, userId } });

  if (todo) {
    if (todo.imageUrl) {
      const oldPath = path.join(__dirname, `../uploads/todo/${todo.imageUrl}`);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await todo.destroy();
    res.json({ message: 'Todo deletado com sucesso' });
  } else {
    res.status(404).json({ message: 'Todo não encontrado' });
  }
};