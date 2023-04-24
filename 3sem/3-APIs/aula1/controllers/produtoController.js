import { Produto } from "../models/Produto.js";

export async function produtoIndex(req, res) {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(400).send(error);
    }
}

export async function produtoCreate(req, res) {
    const { drescricao, marca, quant, preco } = req.body;
    try {
        const produtos = await Produto.create({
            drescricao,
            marca,
            preco,
            quant,
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(400).send(error);
    }
}
