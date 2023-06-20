import { sequelize } from '../databases/conecta.js'
import { Avaliacao } from '../models/Avaliacao.js';
import { Restaurante } from '../models/Restaurante.js';

export const avaliacaoIndex = async (req, res) => {

  try {
    const avaliacoes = await Avaliacao.findAll({
      include: Restaurante
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoCreate = async (req, res) => {
  const { restaurante_id, nome, comentario, nota } = req.body

  // se não informou estes atributos
  if (!restaurante_id || !nome || !comentario || !nota) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.create({
      restaurante_id, nome, comentario, nota
    }, { transaction: t });

    await Restaurante.increment('total',
      { by: nota, where: { id: restaurante_id }, transaction: t }
    );

    await Restaurante.increment('num',
      { by: 1, where: { id: restaurante_id }, transaction: t }
    );

    await t.commit();
    res.status(201).json(avaliacao)

  } catch (error) {

    await t.rollback();
    res.status(400).json({"id": 0, "Erro": error})

  }
}

export const avaliacaoDestroy = async (req, res) => {
  const { id } = req.params

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.findByPk(id)

    await Restaurante.decrement('total',
      { by: avaliacao.nota, 
        where: { id: avaliacao.restaurante_id }, 
        transaction: t }
    );

    await Restaurante.decrement('num',
      { by: 1, 
        where: { id: avaliacao.restaurante_id }, 
        transaction: t }
    );

    await Avaliacao.destroy({
        where: { id }
    });
  
    await t.commit();
    res.status(200).json({msg: "Ok! Avaliação Excluída com Sucesso"})

  } catch (error) {

    await t.rollback();
    res.status(400).json({"id": 0, "Erro": error})

  }
}
