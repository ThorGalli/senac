import bcrypt from "bcrypt";

import { Usuario } from "../models/Usuario.js";
import { Item } from "../models/Item.js";
import { Anuncio } from "../models/Anuncio.js";
import { logAction } from "./logController.js";

function validaSenha(senha) {
    const mensa = [];

    if (senha.length < 8) {
        mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres");
    }

    let pequenas = 0;
    let grandes = 0;
    let numeros = 0;
    let simbolos = 0;

    for (const letra of senha) {
        if (/[a-z]/.test(letra)) {
            pequenas++;
        } else if (/[A-Z]/.test(letra)) {
            grandes++;
        } else if (/[0-9]/.test(letra)) {
            numeros++;
        } else {
            simbolos++;
        }
    }

    if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
        mensa.push(
            "Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos"
        );
    }

    return mensa;
}

export const usuarioIndex = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [Item, { model: Anuncio, include: Item }],
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const me = async (req, res) => {
    const id = req.user_logado_id;

    try {
        const usuario = await Usuario.findOne({
            where: { id },
            include: [{ model: Item }, { model: Anuncio, include: Item }],
        });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const usuarioGet = async (req, res) => {
    id = req.param;
    try {
        const usuario = await Usuario.findOne({
            where: { id },
            include: Item,
        });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const usuarioCreate = async (req, res) => {
    const { nome, email, senha } = req.body;

    const alreadyExists = await Usuario.findOne({ where: { email } });
    if (alreadyExists) {
        res.status(400).json({ id: 0, msg: "Erro... Email já está em uso" });
        return;
    }

    if (!nome || !email || !senha) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
        return;
    }

    const mensaValidacao = validaSenha(senha);
    if (mensaValidacao.length >= 1) {
        res.status(400).json({ id: 0, msg: mensaValidacao });
        return;
    }

    try {
        const usuario = await Usuario.create({
            nome,
            email,
            senha,
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const usuarioAlteraSenha = async (req, res) => {
    const id = req.user_logado_id;
    const { senha_antiga, senha_nova } = req.body;

    if (!senha_antiga || !senha_nova) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
        return;
    }

    try {
        const usuario = await Usuario.findOne({ where: { id } });

        if (usuario == null) {
            res.status(400).json({ erro: "Erro... E-mail inválido" });
            return;
        }

        const mensaValidacao = validaSenha(senha_nova);
        if (mensaValidacao.length >= 1) {
            res.status(400).json({ id: 0, msg: mensaValidacao });
            return;
        }

        if (bcrypt.compareSync(senha_antiga, usuario.senha)) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(senha_nova, salt);
            usuario.senha = hash;
            await usuario.save();
            res.status(200).json({ msg: "Ok. Senha Alterada com Sucesso" });
        } else {
            await logAction("Tentativa de alteração de senha", id);
            res.status(400).json({ erro: "Erro... Senha inválida" });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
