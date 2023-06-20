import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Restaurante } from "./Restaurante.js";
import { Usuario } from "./Usuario.js";
import { Item } from "./Item.js";

export const Anuncio = sequelize.define(
    "anuncio",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        preco: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        // optional args
    }
);

Anuncio.belongsTo(Usuario, {
    foreignKey: {
        name: "usuario_id",
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Usuario.hasMany(Anuncio, {
    foreignKey: "usuario_id",
    allowNull: false,
});

Item.belongsTo(Anuncio);
Anuncio.hasOne(Item);
