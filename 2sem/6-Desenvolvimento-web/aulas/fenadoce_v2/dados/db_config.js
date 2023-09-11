import knex from 'knex'
import { development } from '../knexfile.js'

const connection = knex(development)

export default connection