import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'todo',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

try{
  sequelize.authenticate();
  console.log("conexão ao banco realizada com sucesso");
  
}catch(error){
  console.log('Não foi possível conectar ao banco', error);
} 
