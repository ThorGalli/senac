import { Router } from "express";
import { produtoIndex } from "./controllers/produtoController.js";
const routes = Router();

routes.get("/produtos", produtoIndex);

export default routes;
