import { sequelize } from "../databases/conecta.js";
import { Jogadores } from "../models/Jogador.js";

export const jogadorRead = async (req, res) => {
    try {
        const jogadores = await Jogadores.findAll();
        res.status(200).json(jogadores);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorCreate = async (req, res) => {
    const { nome, clube, posicao, idade, salário } = req.body;

    // se não informou estes atributos
    if (!nome || !clube || !posicao || !idade || !salário) {
        res.status(400).json({
            id: 0,
            msg: "Erro... Informe nome, clube, posicao, idade e salário do jogador.",
        });
        return;
    }

    try {
        const jogador = await Jogadores.create({
            nome,
            clube,
            posicao,
            idade,
            salário,
        });
        res.status(201).json(jogador);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorUpdate = async (req, res) => {
    const { id } = req.params;
    const { nome, clube, posicao, idade, salário } = req.body;

    if (!nome || !clube || !posicao || !idade || !salário) {
        res.status(400).json({
            id: 0,
            msg: "Erro... Informe nome, clube, posicao, idade e salário do jogador.",
        });
        return;
    }

    try {
        const jogador = await Jogadores.update(
            {
                nome,
                clube,
                posicao,
                idade,
                salário,
            },
            {
                where: { id },
            }
        );
        res.status(200).json(jogador);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const jogador = await Jogadores.destroy({
            where: { id },
        });
        res.status(200).json(jogador);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorSearch = async (req, res) => {
    const { id } = req.params;
    try {
        const jogador = await Jogadores.findByPk(id);
        if (jogador) {
            res.status(200).json(jogador);
        } else {
            res.status(200).json({
                id: 0,
                msg: "Erro... Jogador não encontrado.",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorTotal = async (req, res) => {
    try {
        const num = await Jogadores.count();
        const total = await Jogadores.sum("salário");

        if (num && total) {
            res.status(200).json({ num, total });
        } else {
            res.status(200).json({
                id: 0,
                msg: "Erro... Falha no cálculo dos totais",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};
