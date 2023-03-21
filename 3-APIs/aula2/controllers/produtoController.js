import { sequelize } from '../databases/conecta.js';
import { Produto } from '../models/Produto.js'

export const produtoIndex = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const produtoCreate = async (req, res) => {
  const { descricao, marca, quant, preco } = req.body

  // se não informou estes atributos
  if (!descricao || !marca || !quant || !preco) {
    res.status(400).json({ id: 0, msg: "Erro... Informe nome, marca, quant e preco do produto." })
    return
  }

  try {
    const produto = await Produto.create({
      descricao, marca, quant, preco
    });
    res.status(201).json(produto)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const produtoUpdate = async (req, res) => {
  const { id } = req.params
  const { descricao, marca, quant, preco } = req.body

  if (!descricao || !marca || !quant || !preco) {
    res.status(400).json({ id: 0, msg: "Erro... Informe nome, marca, quant e preco do produto." })
    return
  }

  try {
    const produto = await Produto.update({
      descricao, marca, quant, preco
    }, {
      where: { id }
    });
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const produtoDestroy = async (req, res) => {
  const { id } = req.params
  try {
    const produto = await Produto.destroy({
      where: { id }
    });
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const produtoSearch = async (req, res) => {
  const { id } = req.params
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.status(200).json(produto)
    } else {
      res.status(200).json({ id: 0, msg: "Erro... Produto não encontrado." })
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export const produtoTotal = async (req, res) => {
  try {
    const num = await Produto.count();
    const total = await Produto.sum('preco')

    // para calcular o total em estoque (soma da quantidade * preco de cada produto)
    const total2 = await Produto.findOne({
      attributes: [[sequelize.fn("SUM", sequelize.literal("quant*preco")), 'subtotal']],
      raw: true
    });

    if (num && total && total2) {
      res.status(200).json({ num, total, total2: total2.subtotal })
    } else {
      res.status(200).json({ id: 0, msg: "Erro... Falha no cálculo dos totais ou estoque vazio" })
    }
  } catch (error) {
    res.status(400).send(error)
  }
}
