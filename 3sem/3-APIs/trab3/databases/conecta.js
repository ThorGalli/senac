import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("game_ah", "root", "senacrs", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
});
