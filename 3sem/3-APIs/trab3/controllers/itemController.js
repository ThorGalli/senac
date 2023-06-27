import { sequelize } from "../databases/conecta.js";
import { getRandomItem } from "../helper/itemHelper.js";
import { Item } from "../models/Item.js";
import { Usuario } from "../models/Usuario.js";

export const itemCreate = async (req, res) => {
    const craftPrice = 5;
    const usuarioId = req.user_logado_id;
    const trans = await sequelize.transaction();

    console.log("\n~~~~\nStart try item create");
    try {
        const user = await Usuario.findOne({ where: { id: usuarioId } });
        if (user.coins < 5) {
            res.status(402).json({ msg: "Você não tem coins o suficiente!" });
            return;
        }
        const { nome, descricao } = getRandomItem();

        const item = await Item.create(
            {
                nome,
                descricao,
                usuarioId,
            },
            { transaction: trans }
        );
        await Usuario.decrement("coins", {
            by: craftPrice,
            where: { id: user.id },
            transaction: trans,
        });

        await trans.commit();
        res.status(201).json({ item, custoDosMateriais: 5 });
    } catch (error) {
        res.status(400).send(error);
    }
};
