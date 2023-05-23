import { Router } from "express";
import {
    excursaoCreate,
    excursoesIndex,
} from "./controllers/excursaoController.js";
import {
    reservaCreate,
    reservasIndex,
} from "./controllers/reservaController.js";

const router = Router();

router.get("/excursoes", excursoesIndex).post("/excursoes", excursaoCreate);

router.get("/reservas", reservasIndex).post("/reservas", reservaCreate);

export default router;
