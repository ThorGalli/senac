import { Router } from "express";
import {
    me,
    usuarioAlteraSenha,
    usuarioCreate,
    usuarioIndex,
} from "./controllers/usuarioController.js";
import { loginUsuario } from "./controllers/loginController.js";
import { verificaLogin } from "./middlewares/verificaLogin.js";
import { itemCreate } from "./controllers/itemController.js";
import {
    anuncioCancel,
    anuncioComprar,
    anuncioCreate,
    anuncioIndex,
} from "./controllers/anuncioController.js";
import { banUsuario } from "./controllers/adminController.js";

const router = Router();

// Publicas
router.post("/usuarios", usuarioCreate);
router.get("/anuncios", anuncioIndex);
router.get("/login", loginUsuario);

// Protegidas
router.post("/alterarsenha", verificaLogin, usuarioAlteraSenha);
router
    .get("/usuarios", verificaLogin, usuarioIndex)
    .get("/me", verificaLogin, me);
router.post("/anuncios/create", verificaLogin, anuncioCreate);
router.delete("/anuncios/cancel/:id", verificaLogin, anuncioCancel);
router.post("/anuncios/comprar/:id", verificaLogin, anuncioComprar);
router.post("/itemCreate", verificaLogin, itemCreate);
router.delete("/ban/:id", verificaLogin, banUsuario);
export default router;
