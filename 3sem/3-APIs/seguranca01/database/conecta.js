import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("restaurante_manha", "root", "senacrs", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});
