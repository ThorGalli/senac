import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

import { Usuario } from "../models/Usuario.js";
import { logAction } from "./logController.js";

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const mensaErroPadrao = "Erro... Login ou senha inválido";

    if (!email || !senha) {
        await logAction(`Tentativa de login, usuario ${id}`);
        res.status(400).json({ erro: mensaErroPadrao });
        return;
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (usuario == null) {
            res.status(400).json({ erro: mensaErroPadrao });
            return;
        }

        if (bcrypt.compareSync(senha, usuario.senha)) {
            const token = jwt.sign(
                {
                    user_logado_id: usuario.id,
                    user_logado_nome: usuario.nome,
                },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({ msg: "Ok. Logado", token });
        } else {
            await logAction("Tentativa de login", usuario.id);
            res.status(400).json({ erro: mensaErroPadrao });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
