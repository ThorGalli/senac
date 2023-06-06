import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { Usuario } from "./modules/Usuario.js";
import { Restaurante } from "./modules/Restaurante.js";
import { Avaliacao } from "./modules/Avaliacao.js";

console.log("\nStarting Restaurante app...\n");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

async function conecta_db() {
    try {
        await Usuario.sync();
        await Restaurante.sync();
        await Avaliacao.sync();
    } catch (error) {
        console.error("Erro na conexão com o banco: ", error);
    }
}
conecta_db();

app.get("/", (req, res) => {
    res.send("Aula 1: Desenvolvimento de Serviços e APIs");
});

app.listen(port, () => {
    console.log(`Servidor Rodando na Porta: ${port}`);
});
