import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";
import dotenv from 'dotenv';
import {sequelize} from "./config/database";
import path from "path";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', todoRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async ()=>{
    await sequelize.sync();
    console.log(`Servidor rodando na porta ${PORT}`);
})