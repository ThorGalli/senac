import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Destino = sequelize.define("destino", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
});
