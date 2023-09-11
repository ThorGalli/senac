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

export const anuncioCancel = async (req, res) => {
    const { id: anuncio_id } = req.params;
    const usuario_id = req.user_logado_id;

    const trans = await sequelize.transaction();

    try {
        const user = await Usuario.findOne({ where: { id: usuario_id } });
        const anuncio = await Anuncio.findOne({ where: { id: anuncio_id } });
        const item = await Item.findOne({ where: { anuncioId: anuncio_id } });

        if (!user || !anuncio || !item || anuncio.usuario_id != user.id) {
            res.status(406).json({ msg: "Item não encontrado." });
            return;
        } else if (!item.em_anuncio) {
            res.status(406).json({ msg: "Esse item não está em anúncio." });
            return;
        }
        await anuncio.update({ status: "CANCELED" }, { transaction: trans });
        await anuncio.destroy({ transaction: trans });
        await item.update(
            { em_anuncio: false, anuncioId: null },
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

export const anuncioComprar = async (req, res) => {
    const { id: anuncio_id } = req.params;
    const compradorId = req.user_logado_id;

    const trans = await sequelize.transaction();
    try {
        const anuncio = await Anuncio.findOne({ where: { id: anuncio_id } });
        const item = await Item.findOne({ where: { anuncioId: anuncio_id } });
        const comprador = await Usuario.findOne({ where: { id: compradorId } });
        const vendedor = await Usuario.findOne({
            where: { id: item.usuarioId },
        });

        const preco = anuncio.preco;

        if (!comprador || !anuncio || !item || !vendedor) {
            res.status(406).json({ msg: "Item não encontrado." });
            return;
        } else if (!item.em_anuncio) {
            res.status(406).json({ msg: "Esse item não está em anúncio." });
            return;
        } else if (comprador.id == vendedor.id) {
            res.status(406).json({
                msg: "Você não pode comprar seu próprio item.",
            });
            return;
        }

        await anuncio.update({ status: "CLOSED" }, { transaction: trans });
        await anuncio.destroy({ transaction: trans });
        await comprador.decrement("coins", {
            by: preco,
            transaction: trans,
        });

        await vendedor.increment("coins", {
            by: preco,
            transaction: trans,
        });

        await item.update(
            { em_anuncio: false, anuncioId: null, usuarioId: compradorId },
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
