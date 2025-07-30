import { Router } from "express";
import {
  getAllTodo,
  searchTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController';
import { register, login, home, loginWithGoogle,updateProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/register', upload.single('profileImage'), register);
router.post('/auth/google', loginWithGoogle);
router.post('/login', login);
router.get('/home', authenticate, home);
router.put('/profile', authenticate, upload.single('profileImage'), updateProfile);

router.get('/todos', authenticate, getAllTodo);
router.get('/todos/search', authenticate, searchTodos);
router.get('/todos/:id', authenticate, getTodoById);
// router.post('/todos', authenticate, createTodo);
// router.put('/todos/:id', authenticate, updateTodo);
router.post('/todos', authenticate, upload.single('file'), createTodo);
router.put('/todos/:id', authenticate, upload.single('file'), updateTodo);
router.delete('/todos/:id', authenticate, deleteTodo);

export default router;
