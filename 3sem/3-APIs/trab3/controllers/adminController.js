import { Usuario } from "../models/Usuario.js";
import { logAction } from "./logController.js";

export const banUsuario = async (req, res) => {
    const adminID = req.user_logado_id;
    const { id: userID } = req.params;
    console.log("A@@@", userID);
    const admin = await Usuario.findOne({
        where: { id: adminID, access: 2 },
    });
    if (!admin) {
        res.status(400).send("Acesso negado.");
        await logAction("Tentativa de acesso restrito.", userID);
        return;
    }
    if (admin.id == userID) {
        res.status(400).send("Ação previnida: autobanimento do admin.");
        return;
    }
    console.log("@\n@", userID);
    try {
        const user = await Usuario.findOne({
            where: { id: userID },
        });
        await logAction("Usuário banido por administrador.", userID);
        await user.destroy();
        res.status(200).send({ msg: "usuario banido", user });
    } catch (error) {
        res.status(400).send(error);
    }
};
