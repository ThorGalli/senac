import { Router } from "express";
import {
    jogadorCreate,
    jogadorDelete,
    jogadorRead,
    jogadorSearch,
    jogadorTotal,
    jogadorUpdate,
} from "./controllers/jogadorController.js";

const router = Router();

router
    .get("/jogadores", jogadorRead)
    .post("/jogadores", jogadorCreate)
    .put("/jogadores/:id", jogadorUpdate)
    .delete("/jogadores/:id", jogadorDelete)
    .get("/jogadores/total", jogadorTotal)
    .get("/jogadores/:id", jogadorSearch);

export default router;
