import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Jogadores = sequelize.define(
    "Jogador",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        clube: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        posicao: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salario: {
            type: DataTypes.REAL,
            allowNull: false,
        },
    },
    {
        tableName: "Jogadores",
    }
);
