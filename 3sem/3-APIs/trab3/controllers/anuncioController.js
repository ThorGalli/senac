import { sequelize } from "../databases/conecta.js";
import { Anuncio } from "../models/Anuncio.js";
import { Item } from "../models/Item.js";
import { Usuario } from "../models/Usuario.js";

export const anuncioCreate = async (req, res) => {
    const { item_id, preco } = req.body;
    const usuario_id = req.user_logado_id;

    const trans = await sequelize.transaction();

    try {
        const user = await Usuario.findOne({ where: { id: usuario_id } });
        const item = await Item.findOne({ where: { id: item_id } });

        if (!user || !item || item.usuarioId != user.id) {
            res.status(406).json({ msg: "Item não encontrado." });
        } else if (item.em_anuncio) {
            res.status(406).json({ msg: "Esse item já está em anúncio." });
        }

        const anuncio = await Anuncio.create(
            {
                usuario_id,
                preco,
            },
            { transaction: trans }
        );
        await item.update(
            { em_anuncio: true, anuncioId: anuncio.id },
            {
                where: { id: item.id },
                transaction: trans,
            }
        );

        await trans.commit();
        res.status(201).json(anuncio);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const anuncioIndex = async (req, res) => {
    try {
        const anuncios = await Anuncio.findAll({
            attributes: ["id", "preco", "status"],
            include: [
                { model: Item, attributes: ["nome", "descricao"] },
                { model: Usuario, attributes: ["nome"] },
            ],
        });
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const anuncioCancel = async (res, req) => {
    const { anuncio_id } = req.param;
    const usuario_id = req.user_logado_id;

    const trans = await sequelize.transaction();

    try {
        const user = await Usuario.findOne({ where: { id: usuario_id } });
        const anuncio = await Anuncio.findOne({ where: { id: anuncio_id } });
        const item = await Item.findOne({ where: { anuncioId: anuncio_id } });
        if (!user || !anuncio || anuncio.usuario_id != user.id) {
            res.status(406).json({ msg: "Item não encontrado." });
        } else if (item.em_anuncio) {
            res.status(406).json({ msg: "Esse item já está em anúncio." });
        }

        await Anuncio.create(
            {
                usuario_id,
                preco,
            },
            { transaction: trans }
        );
        await item.update(
            { em_anuncio: true, anuncioId: anuncio.id },
            {
                where: { id: item.id },
                transaction: trans,
            }
        );

        await trans.commit();
        res.status(201).json(anuncio);
    } catch (error) {
        res.status(400).send(error);
    }
};
