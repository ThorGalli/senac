import knex from 'knex'
// import { development } from '../knexfile.js'
import { production } from '../knexfile.js'

// const connection = knex(development)
const connection = knex(production)

export default connection
