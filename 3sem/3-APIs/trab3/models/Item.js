import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Usuario } from "./Usuario.js";

export const Item = sequelize.define(
    "item",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        em_anuncio: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        paranoid: true,
    }
);

Item.belongsTo(Usuario, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Usuario.hasMany(Item);
