import { Router, json } from 'express'
import { carroDelete, carroIndex, carroIntervalo, carroModelo, carroPesq, carroStore, carroUpdate } from './controllers/CarroController.js'
import { clienteIndex, clienteStore } from './controllers/ClienteController.js'
import { loginCliente } from './controllers/LoginClienteController.js'
import upload from './middlewares/FotoStore.js'
import { verificaLoginCliente } from './middlewares/VerificaLogin.js'

import cors from 'cors'

const router = Router()

// "converte" os dados recebidos para o formato json
router.use(json())

// permite acesso a partir de origens diferentes
router.use(cors())

// define as rotas de cadastro de carros
router.get('/carros', verificaLoginCliente, carroIndex)
  .post('/carros', upload.single('foto'), carroStore)
  .put('/carros/:id', carroUpdate)
  .delete('/carros/:id', carroDelete)
  .get('/carros/pesq/:marca', carroPesq)
  .get('/carros/intervalo/:from-:to', carroIntervalo)
  .get('/carros/modelo/:modelo', carroModelo)

// define as rotas de cadastro de clientes
router.get('/clientes', clienteIndex)
  .post('/clientes', clienteStore)

// define as rotas de cadastro de login
router.get('/clientes_login', loginCliente)

export default router