import * as dotenv from 'dotenv' 
dotenv.config()

export const development = {
  client: 'better-sqlite3',
  connection: {
    filename: './data/revenda.db'
  },
  useNullAsDefault: true
};

export const production = {
  client: 'mysql2',
  connection: {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
};
