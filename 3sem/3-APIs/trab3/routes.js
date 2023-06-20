import { Router } from "express"
import { usuarioAlteraSenha, usuarioCreate, usuarioIndex } from "./controllers/usuarioController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoIndex } from "./controllers/avaliacaoController.js"
import { restauranteCreate, restauranteDestroy, restauranteIndex } from "./controllers/restauranteController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"

const router = Router()

router.get('/usuarios', verificaLogin, usuarioIndex)
      .post('/usuarios', usuarioCreate)
      .put('/usuarios', usuarioAlteraSenha)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)

router.get('/restaurantes', restauranteIndex)
      .post('/restaurantes', restauranteCreate)
      .delete('/restaurantes/:id', verificaLogin, restauranteDestroy)

router.get('/login', loginUsuario)

export default router