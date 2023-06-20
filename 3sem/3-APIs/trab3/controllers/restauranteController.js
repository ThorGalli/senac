import { Log } from '../models/Log.js'
import { Restaurante } from '../models/Restaurante.js'
import { Usuario } from '../models/Usuario.js'

export const restauranteIndex = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll({ include: Usuario })
    res.status(200).json(restaurantes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const restauranteCreate = async (req, res) => {
  const { nome, usuario_id } = req.body

  // se não informou estes atributos
  if (!nome || !usuario_id) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const restaurante = await Restaurante.create({
      nome, usuario_id
    });
    res.status(201).json(restaurante)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const restauranteDestroy = async (req, res) => {
  const { id } = req.params
  // obtém dados acrescentados no middleware verificaLogin (ao req)
  const user_logado_id = req.user_logado_id

  try {
    await Restaurante.destroy({ where: { id } });

    // registra um log desta exclusão
    await Log.create({
      descricao: "Exclusão do Restaurante " + id,
      usuario_id: user_logado_id
    })

    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}
