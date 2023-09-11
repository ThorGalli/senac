import { Router, json } from "express";
import cors from "cors";

import {
  candidataDelete,
  candidataIndex,
  candidataPesq,
  candidataStore,
  candidataUpdate,
} from "./controllers/CandidataController.js";
import { votoIndex, votoStore, votoConfirme } from "./controllers/VotoController.js";
import { adminIndex, adminStore } from "./controllers/AdminController.js";
import { loginAdmin } from "./controllers/LoginController.js";

import upload from "./middlewares/FotoStore.js";
import { verificaLogin } from "./middlewares/VerificaLogin.js";

const router = Router();

router.use(json());

// libera acesso ao Web Service, a partir de origens diferentes
router.use(cors());

router.get("/players").post("players");

// define as rotas de cadastro dos admins
router.get("/admins", adminIndex).post("/admins", adminStore);

// define a rota de login
router.get("/login", loginAdmin);

export default router;
