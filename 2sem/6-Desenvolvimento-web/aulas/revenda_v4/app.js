import express from 'express'
import routes from './routes.js'
const app = express()
const port = 3000

app.use(routes)

app.get('/', (req, res) => {
  res.send('Controle de Veículos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})