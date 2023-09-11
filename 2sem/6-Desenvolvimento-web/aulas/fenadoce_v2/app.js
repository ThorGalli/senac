import express from 'express'
const app = express()
const port = 3001

import routes from './routes.js'

app.use(routes)

// libera o acesso aos arquivos (fotos) estáticos da pasta fotos
app.use("/fotos", express.static('./fotos'))

app.get('/', (req, res) => {
  res.send('Cadastro de Candidatas a Rainha')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})