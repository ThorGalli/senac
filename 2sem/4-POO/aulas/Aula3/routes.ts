import { Router, json } from "express";
import cors from "cors";

const router = Router();

router.use(json());

// libera acesso ao Web Service, a partir de origens diferentes
router.use(cors());

// // define as rotas de cadastro das candidatas
router.get("/shops", shopsIndex);
//   .post("/candidatas", upload.single("foto"), candidataStore)
//   .put("/candidatas/:id", candidataUpdate)
//   .delete("/candidatas/:id", verificaLogin, candidataDelete)
//   .get("/candidatas/pesq/:idade", candidataPesq);

// // define as rotas de cadastro dos votos
// router
//   .get("/votos", votoIndex)
//   .post("/votos", votoStore)
//   .get("/votos/confirma/:hash", votoConfirme);

// // define as rotas de cadastro dos admins
// router.get("/admins", adminIndex).post("/admins", adminStore);

// // define a rota de login
// router.get("/login", loginAdmin);

export default router;
