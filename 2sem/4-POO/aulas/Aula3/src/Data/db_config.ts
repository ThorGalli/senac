import knex from "knex";
import { development } from "../../knexfile";

const dbKnex = knex(development);

export default dbKnex;
