import express from 'express'
import { sequelize } from './databases/conecta.js'
import cors from "cors"
import routes from './routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');
    await sequelize.sync();  // cria as tabelas do sistema (a partir dos modelos - se não existirem)
  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('Aula 1: Desenvolvimento de Serviços e APIs')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})