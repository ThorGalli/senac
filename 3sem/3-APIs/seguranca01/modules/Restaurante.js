import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";
import { Usuario } from "./Usuario.js";

export const Restaurante = sequelize.define("restaurante", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    nota_total: {
        type: DataTypes.INTEGER,
        default: 0,
    },
    num_avaliacoes: {
        type: DataTypes.INTEGER,
        default: 0,
    },
});

Restaurante.belongsTo(Usuario, {
    foreignKey: {
        name: "usuario_id",
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Usuario.hasMany(Restaurante, {
    foreignKey: "usuario_id",
});
