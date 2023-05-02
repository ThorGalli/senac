import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Medico = sequelize.define(
    "Medico",
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
        fone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        datanasc: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        // Other model options go here
    }
);
