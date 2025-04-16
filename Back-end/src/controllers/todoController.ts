import {Request,Response} from 'express';
import {Todo} from "../models/todo";

export const getAllTodo = async (req:Request , res:Response) => {
    const todos = await Todo.findAll();
    res.json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
    const user = await Todo.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: 'Usuário não encontrado' });
  };

export const createTodo = async (req:Request, res:Response) => {
    const {title, description} = req.body;
    const todo = await Todo.create({title, description});
    res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const todo = await Todo.findByPk(id);
    if(todo){
        await Todo.update({title, description}, {where:{id}});
        res.json({message:"atualizado com sucesso"})
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const todo = await Todo.findByPk(req.params.id);
    if(todo){
        await Todo.destroy({ where: { id: req.params.id } });
        res.json({message:"Todo deletado"});
    }else{
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

