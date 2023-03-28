import { Router } from "express";
import {
    jogadorCreate,
    jogadorDelete,
    jogadorRead,
    jogadorSearch,
    jogadorUpdate,
} from "./controllers/jogadorController.js";

const router = Router();

router
    .get("/jogadores", jogadorRead)
    .post("/jogadores", jogadorCreate)
    .put("/jogadores/:id", jogadorUpdate)
    .delete("/jogadores/:id", jogadorDelete)
    .get("/jogadores/search", jogadorSearch);

export default router;
