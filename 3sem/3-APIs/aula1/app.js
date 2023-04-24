import express from "express";
import { sequelize } from "./database/connect.js";
import routes from "./routes.js";

const app = express();
const port = 3000;

app.use(express.json);
app.use(routes);

connect_db();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Rodando em: ${port}`);
});

async function connect_db() {
    try {
        await sequelize.authenticate().then(console.log("Conectado ao banco."));
        await sequelize.sync().then(console.log("Sincronizado com o banco."));
    } catch (error) {
        console.error("Erro de conexão ou sincronização:", error);
    }
}
