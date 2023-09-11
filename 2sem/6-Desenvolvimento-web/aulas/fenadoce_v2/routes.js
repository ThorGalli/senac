import { Router, json } from 'express'
import cors from 'cors'

import { candidataDelete, candidataIndex, candidataPesq, candidataStore, candidataUpdate } from './controllers/CandidataController.js'
import { votoIndex, votoStore } from './controllers/VotoController.js'

import upload from './middlewares/FotoStore.js'

const router = Router()

router.use(json())

// libera acesso ao Web Service, a partir de origens diferentes
router.use(cors())

// define as rotas de cadastro das candidatas
router.get('/candidatas', candidataIndex)
      .post('/candidatas', upload.single('foto'), candidataStore)
      .put('/candidatas/:id', candidataUpdate)
      .delete('/candidatas/:id', candidataDelete)
      .get('/candidatas/pesq/:idade', candidataPesq)

// define as rotas de cadastro dos votos
router.get('/votos', votoIndex)
      .post('/votos', votoStore)

export default router