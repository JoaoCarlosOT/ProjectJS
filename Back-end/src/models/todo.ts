import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";

interface TodoAttributes {
  id: number;
  title: string;
  description?: string | null;
  status: "a_fazer" | "em_progresso" | "finalizado";
  userId: number;
  imageUrl?: string | null;
}

type TodoCreationAttributes = Optional<TodoAttributes, "id" | "imageUrl">;

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  declare id: number;
  declare title: string;
  declare description?: string | null;
  declare status: "a_fazer" | "em_progresso" | "finalizado";
  declare userId: number;
  declare imageUrl?: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Todo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true }, 
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("a_fazer", "em_progresso", "finalizado"),
      allowNull: false,
      defaultValue: "a_fazer",
    },
  },
  {
    sequelize,
    modelName: "Todo",
    tableName: "todos",
  }
);

User.hasMany(Todo, { foreignKey: "userId" });
Todo.belongsTo(User, { foreignKey: "userId" });
