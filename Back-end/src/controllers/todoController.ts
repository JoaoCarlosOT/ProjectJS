import { Request, Response } from 'express';
import { Todo } from '../models/todo';
import { Op, fn, col, cast, where } from "sequelize";
import { todoSchema } from '../schemas/todoSchema';
import { uploadToS3, s3, getSignedImageUrl  } from "../middleware/upload";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const getAllTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const todos = await Todo.findAll({ where: { userId } });

  const todosWithSignedUrls = await Promise.all(
    todos.map(async (todo) => {
      const signedUrl = todo.imageUrl ? await getSignedImageUrl(todo.imageUrl) : null;
      return {
        ...todo.toJSON(),
        imageUrl: signedUrl,
      };
    })
  );

  res.json(todosWithSignedUrls);
};


export const searchTodos = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const search = req.body.search as string;

  try {
    const todos = await Todo.findAll({
  where: {
    userId,
    [Op.or]: [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
      where(cast(col("status"), "TEXT"), { [Op.iLike]: `%${search}%` }),
    ],
  },
});

    const todosWithSignedUrls = await Promise.all(
      todos.map(async (todo) => {
        const signedUrl = todo.imageUrl ? await getSignedImageUrl(todo.imageUrl) : null;
        return {
          ...todo.toJSON(),
          imageUrl: signedUrl,
        };
      })
    );

    res.json(todosWithSignedUrls);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar todos com filtro', error });
  }
};


export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as any).id;
  const { id } = req.params;
  const todo = await Todo.findOne({ where: { id, userId } });

  if (!todo) {
    res.status(404).json({ message: 'Todo não encontrado' });
    return;
  }

  const signedUrl = todo.imageUrl ? await getSignedImageUrl(todo.imageUrl) : null;
  res.json({ ...todo.toJSON(), imageUrl: signedUrl });
};


export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const userId = (req.user as any).id;

    // if (!req.file) {
    //   res.status(400).json({ message: 'Imagem da tarefa é obrigatória' });
    //   return;
    // }

    const imageKey = await uploadToS3(req); 
    const todo = await Todo.create({
      title,
      description,
      status,
      userId,
      imageUrl: imageKey,
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
        await s3.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME || "",
          Key: todo.imageUrl,
        }));
      }

      todo.imageUrl = await uploadToS3(req); 
    }

    await todo.save();
    res.json({ message: "Tarefa atualizada com sucesso", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).id;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: 'Todo não encontrado' });
      return;
    }

    if (todo.imageUrl) {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: todo.imageUrl,
      }));
    }

    await todo.destroy();
    res.json({ message: 'Todo deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar tarefa.' });
  }
};
