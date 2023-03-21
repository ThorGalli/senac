import { Router } from "express"
import { produtoCreate, produtoDestroy, produtoIndex, 
         produtoSearch, produtoTotal, produtoUpdate } from "./controllers/produtoController.js"

const router = Router()

router.get('/produtos', produtoIndex)
      .post('/produtos', produtoCreate)
      .put('/produtos/:id', produtoUpdate)
      .delete('/produtos/:id', produtoDestroy)
      .get('/produtos/total', produtoTotal)
      .get('/produtos/:id', produtoSearch)

export default router