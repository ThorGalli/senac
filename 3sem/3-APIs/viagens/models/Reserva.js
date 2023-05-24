import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Cliente } from "./Cliente.js";
import { Excursao } from "./Excursao.js";

export const Reserva = sequelize.define("reserva", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    preco: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
    },
});

Reserva.belongsTo(Cliente, {
    foreignKey: {
        name: "cliente_id",
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Reserva.belongsTo(Excursao, {
    foreignKey: {
        name: "excursao_id",
        allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});

Excursao.hasMany(Reserva, {
    foreignKey: "reserva_id",
});

Cliente.hasMany(Reserva, {
    foreignKey: "reserva_id",
});
