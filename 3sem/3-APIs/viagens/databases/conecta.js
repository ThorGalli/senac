import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("simulado_viagens", "root", "senacrs", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
});
