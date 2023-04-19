import { DataTypes } from "sequelize";
import { sequelize } from "../database/connect.js";

export const Produto = sequelize.define(
    "Produto",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descricao: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        preco: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        quant: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        // Other model options go here
    }
);
