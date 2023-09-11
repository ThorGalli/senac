import { Router, json } from "express";
import {
  carroDelete,
  carroIndex,
  carroIntervalo,
  carroPesq,
  carroStore,
  carroUpdate,
  carroModelo,
} from "./controllers/CarroController.js";
import { clienteIndex, clienteStore } from "./controllers/ClientController.js";
const router = Router();

// "converte" os dados recebidos para o formato json
router.use(json());

// define as rotas de cadastro de carros
router
  .get("/carros", carroIndex)
  .post("/carros", carroStore)
  .put("/carros/:id", carroUpdate)
  .delete("/carros/:id", carroDelete)
  .get("/carros/pesq/:marca", carroPesq)
  .get("/carros/modelo/:modelo", carroModelo)
  .get("/carros/intervalo/:from-:to", carroIntervalo)
  .get("/clientes", clienteIndex)
  .post("/clientes", clienteStore);

export default router;
