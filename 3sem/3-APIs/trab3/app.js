import express from "express";
import cors from "cors";
import routes from "./routes.js";

import { sequelize } from "./databases/conecta.js";

import { Log } from "./models/Log.js";
import { Usuario } from "./models/Usuario.js";
import { Item } from "./models/Item.js";
import { Anuncio } from "./models/Anuncio.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

async function conecta_db() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com banco de dados realizada com sucesso");
        await sequelize.sync({ alter: true });
        // Pode-se indicar a sincronização das models uma por uma
        // await Usuario.sync({ alter: true });
        // await Item.sync({ alter: true });
        // await Log.sync({ alter: true });
        // await Anuncio.sync({ alter: true });
    } catch (error) {
        console.error("Erro na conexão com o banco: ", error);
    }
}
conecta_db();

app.get("/", (req, res) => {
    res.send("API Avaliação de Restaurantes");
});

app.listen(port, () => {
    console.log(`Servidor Rodando na Porta: ${port}`);
});
