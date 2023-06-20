import { Item } from "../models/Item";

export const itemCreate = async (req, res) => {
    const { nome, descricao, usuario_id } = req.body;

    // se não informou estes atributos
    if (!nome || !descricao || !usuario_id) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
        return;
    }

    try {
        const item = await Item.create({
            nome,
            descricao,
            usuario_id,
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).send(error);
    }
};
