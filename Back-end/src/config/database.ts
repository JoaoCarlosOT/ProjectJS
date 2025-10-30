import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false
  }
);

try{
  sequelize.authenticate();
  console.log("conexão ao banco realizada com sucesso");
  
}catch(error){
  console.log('Não foi possível conectar ao banco', error);
} 
