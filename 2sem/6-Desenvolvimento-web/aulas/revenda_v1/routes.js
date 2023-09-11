import { Router, json } from 'express'
import { carroDelete, carroIndex, carroIntervalo, carroPesq, carroStore, carroUpdate } from './controllers/CarroController.js'
const router = Router()

// "converte" os dados recebidos para o formato json
router.use(json())

// define as rotas de cadastro de carros
router.get('/carros', carroIndex)
      .post('/carros', carroStore) 
      .put('/carros/:id', carroUpdate) 
      .delete('/carros/:id', carroDelete) 
      .get('/carros/pesq/:marca', carroPesq) 
      .get('/carros/intervalo/:from-:to', carroIntervalo) 

export default router