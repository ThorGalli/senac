import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";

import { Restaurante } from "./Restaurante.js";

export const Avaliacao = sequelize.define(
    "avaliacao",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        comentario: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        nota: {
            type: DataTypes.INTEGER,
            default: 0,
        },
    },
    { tableName: "avaliacoes" }
);

Avaliacao.belongsTo(Restaurante, {
    foreignKey: {
        name: "restaurante_id",
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Restaurante.hasMany(Avaliacao, {
    foreignKey: "restaurante_id",
});
