import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Destino } from "./Destino.js";

export const Excursao = sequelize.define(
    "excursao",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_reservas: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limite_vagas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { tableName: "excursoes" }
);

Excursao.belongsTo(Destino, {
    foreignKey: {
        name: "destino_id",
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Destino.hasMany(Excursao, {
    foreignKey: "excursao_id",
});
