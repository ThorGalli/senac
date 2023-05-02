import { sequelize } from "../databases/conecta.js";
import { Bebe } from "../models/Bebe.js";
import { Mae } from "../models/Mae.js";
import { Medico } from "../models/Medico.js";

export const bebeIndex = async (req, res) => {
    try {
        const bebes = await Bebe.findAll();
        res.status(200).json(bebes);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const bebeCreate = async (req, res) => {
    const { nome, mae_id, medico_id, peso, altura, datanasc } = req.body;

    // se não informou estes atributos
    if (!nome || !mae_id || !medico_id || !peso || !altura || datanasc) {
        res.status(400).json({
            id: 0,
            msg: "Erro... Dados incompletos",
        });
        return;
    }

    try {
        const bebe = await Bebe.create({
            nome,
            mae_id,
            medico_id,
            peso,
            altura,
            datanasc,
        });
        res.status(201).json(bebe);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const bebeUpdate = async (req, res) => {
    const { id } = req.params;
    const { nome, peso, altura, datanasc } = req.body;

    if (!nome || !peso || !altura || datanasc) {
        res.status(400).json({
            id: 0,
            msg: "Erro... Informe nome, marca, quant e preco do bebe.",
        });
        return;
    }

    try {
        const bebe = await Bebe.update(
            {
                nome,
                peso,
                altura,
                datanasc,
            },
            {
                where: { id },
            }
        );
        res.status(200).json(bebe);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const bebeDestroy = async (req, res) => {
    const { id } = req.params;
    try {
        const bebe = await Bebe.destroy({
            where: { id },
        });
        res.status(200).json(bebe);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const bebeSearch = async (req, res) => {
    const { id } = req.params;
    try {
        const bebe = await Bebe.findByPk(id);
        if (bebe) {
            res.status(200).json(bebe);
        } else {
            res.status(200).json({
                id: 0,
                msg: "Erro... Bebe não encontrado.",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

export const bebeTotal = async (req, res) => {
    try {
        const num = await Bebe.count();
        const total = await Bebe.sum("preco");

        // para calcular o total em estoque (soma da quantidade * preco de cada bebe)
        const total2 = await Bebe.findOne({
            attributes: [
                [
                    sequelize.fn("SUM", sequelize.literal("quant*preco")),
                    "subtotal",
                ],
            ],
            raw: true,
        });

        if (num && total && total2) {
            res.status(200).json({ num, total, total2: total2.subtotal });
        } else {
            res.status(200).json({
                id: 0,
                msg: "Erro... Falha no cálculo dos totais ou estoque vazio",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};
