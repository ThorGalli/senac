import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "restaurantes_noite", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});