import { Jogadores } from "../models/Jogador.js";
import { Op } from "sequelize";

// <CRUD>
export const jogadorCreate = async (req, res) => {
    const { nome, clube, posicao, idade, salario } = req.body;

    // se não informou estes atributos
    if (!nome || !clube || !posicao || !idade || !salario) {
        res.status(400).json({
            id: 0,
            msg: "Erro... Informe nome, clube, posicao, idade e salario do jogador.",
        });
        return;
    }

    try {
        const jogador = await Jogadores.create({
            nome,
            clube,
            posicao,
            idade,
            salario,
        });
        res.status(201).json(jogador);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorRead = async (req, res) => {
    try {
        const jogadores = await Jogadores.findAll();
        res.status(200).json(jogadores);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const jogadorUpdate = async (req, res) => {
    const { id } = req.params;
    const { nome, clube, posicao, idade, salario } = req.body;

    if (!nome || !clube || !posicao || !idade || !salario) {
        res.status(400).json({
            id: 0,
            msg: "Erro... Informe nome, clube, posicao, idade e salario do jogador.",
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
                salario,
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
        res.status(200).json({ id, msg: "Jogador removido" });
    } catch (error) {
        res.status(400).send(error);
    }
};
// </CRUD>

// <Filters>
export const jogadorSearch = async (req, res) => {
    const { pesquisa, entreIdades } = req.body;

    const betweenAges =
        entreIdades?.length === 2
            ? { idade: { [Op.between]: [entreIdades[0], entreIdades[1]] } }
            : {};

    const searchQuery = pesquisa
        ? {
              [Op.or]: [
                  { nome: { [Op.like]: `%${pesquisa}%` } },
                  { clube: { [Op.like]: `%${pesquisa}%` } },
                  { posicao: { [Op.like]: `%${pesquisa}%` } },
              ],
          }
        : {};

    const query = { where: { [Op.and]: { ...betweenAges, ...searchQuery } } };
    try {
        const jogadores = await Jogadores.findAll(query);
        if (jogadores?.length > 0) {
            res.status(200).json({ jogadores });
        } else {
            res.status(200).json({
                msg: "Nenhum resultado encontrado.",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};
