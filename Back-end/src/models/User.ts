import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface UserAttributes {
  id: number;
  name?: string | null;
  email: string;
  password?: string | null;
  profileImage?: string | null;
  provider: string;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "name" | "password" | "profileImage"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{

  declare id: number;
  declare name?: string | null;
  declare email: string;
  declare password?: string | null;
  declare profileImage?: string | null;
  declare provider: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    profileImage: { type: DataTypes.STRING, allowNull: true },
    provider: { type: DataTypes.STRING, allowNull: false, defaultValue: "local" },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);
