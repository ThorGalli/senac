import { Cliente } from "../models/Cliente.js";
import { Destino } from "../models/Destino.js";
import { Excursao } from "../models/Excursao.js";

export const excursoesIndex = async (req, res) => {
    try {
        const excursoes = await Excursao.findAll({
            include: Cliente,
            include: Destino,
        });
        res.status(200).json(excursoes);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const excursaoCreate = async (req, res) => {
    const { destino_id, data, limite_vagas } = req.body;

    if (!destino_id || !data || !limite_vagas) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
        return;
    }

    try {
        const excursao = await Excursao.create({
            destino_id,
            data,
            limite_vagas,
        });
        res.status(201).json(excursao);
    } catch (error) {
        res.status(400).send(error);
    }
};
