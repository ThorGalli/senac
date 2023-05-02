import { Sequelize } from "sequelize";

export const sequelize = Sequelize("bercario", "aluno", "senacrs", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});
