import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ProdutoAttributes {
  id: number;
  nome: string;
  preco: number;
}

export interface ProdutoCreationAttributes extends Optional<ProdutoAttributes, "id"> {}

export class ProdutoModel extends Model<ProdutoAttributes, ProdutoCreationAttributes> implements ProdutoAttributes {
  declare id: number;
  declare nome: string;
  declare preco: number;
}

ProdutoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "produtos"
  }
);