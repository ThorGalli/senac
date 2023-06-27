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
    anuncioCreate,
    anuncioIndex,
} from "./controllers/anuncioController.js";

const router = Router();

// Publicas
router.get("/anuncios", anuncioIndex);
router.get("/login", loginUsuario);

router
    .post("/usuarios", usuarioCreate) //
    .put("/usuarios", usuarioAlteraSenha);

// Protegidas
router
    .get("/usuarios", verificaLogin, usuarioIndex)
    .get("/me", verificaLogin, me);
router.post("/anuncios", verificaLogin, anuncioCreate);
router.post("/itemCreate", verificaLogin, itemCreate);

export default router;
