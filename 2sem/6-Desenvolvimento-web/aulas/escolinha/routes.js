import { Router, json } from "express";
import {
  exercDelete,
  exercIndex,
  exercPesq,
  exercStore,
  exercUpdate,
} from "./controllers/ExerciciosController.js";
import {
  topicosIntervalo,
  topicosIndex,
  topicosStore,
  topicosUpdate,
  topicosDelete,
  topicosPesq,
} from "./controllers/TopicosController.js";
const router = Router();

router.use(json());

router
  .get("/topicos", topicosIndex)
  .post("/topicos", topicosStore)
  .put("/topicos/:id", topicosUpdate)
  .delete("/topicos/:id", topicosDelete)
  .get("/topicos/pesq/:palavra", topicosPesq)
  .get("/topicos/intervalo/:from-:to", topicosIntervalo);

router
  .get("/exercicios", exercIndex)
  .post("/exercicios", exercStore)
  .put("/exercicios/:id", exercUpdate)
  .delete("/exercicios/:id", exercDelete)
  .get("/exercicios/pesq/:nome", exercPesq);

export default router;
