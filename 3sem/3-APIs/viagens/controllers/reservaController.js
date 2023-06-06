import { sequelize } from "../databases/conecta.js";
import { Reserva } from "../models/Reserva.js";
import { Cliente } from "../models/Cliente.js";
import { Excursao } from "../models/Excursao.js";
import { Destino } from "../models/Destino.js";

export const reservasIndex = async (req, res) => {
    try {
        const reserva = await Reserva.findAll({
            include: [Cliente, { model: Excursao, include: Destino }],
        });
        res.status(200).json(reserva);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const reservaCreate = async (req, res) => {
    const { cliente_id, excursao_id, preco } = req.body;

    if (!cliente_id || !excursao_id || !preco) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
        return;
    }

    const trans = await sequelize.transaction();

    try {
        const reserva = await Reserva.create(
            {
                cliente_id,
                excursao_id,
                preco,
            },
            { transaction: trans }
        );

        const excursaoToUpdate = await Excursao.findOne({
            where: { id: excursao_id },
        });

        const isExcursaoFull =
            excursaoToUpdate.get("limite_vagas") <=
            excursaoToUpdate.get("total_reservas");

        if (isExcursaoFull) {
            throw "Excursao lotada!";
        }

        await Excursao.increment("total_reservas", {
            by: 1,
            where: { id: excursao_id },
            transaction: trans,
        });

        await trans.commit();
        res.status(201).json(reserva);
    } catch (error) {
        await trans.rollback();
        const msg = error || "";
        res.status(400).json({
            id: 0,
            Erro: "Erro... " + msg,
        });
    }
};
