import dbKnex from '../data/db_config.js'
import fs from 'fs'

export const carroIndex = async (req, res) => {
  try {
    // obtém da tabela de carros todos os registros
    const carros = await dbKnex.select("*").from("carros")
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const carroStore = async (req, res) => {

  // informações que podem ser obtidas do arquivo enviado
  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const foto = req.file.path; // obtém o caminho do arquivo no server

  if ((req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") || req.file.size > 512 * 1024) {
    fs.unlinkSync(foto); // exclui o arquivo do servidor
    res
      .status(400)
      .json({ msg: "Formato inválido da imagem ou imagem muito grande" });
    return;
  }

  // atribui via desestruturação
  const { modelo, marca, ano, preco } = req.body

  if (!modelo || !marca || !ano || !preco || !foto) {
    res.status(400).json({ id: 0, msg: "Erro... informe modelo, marca, ano, preco e foto do veículo" })
    return
  }

  try {
    const novo = await dbKnex('carros').insert({ modelo, marca, ano, preco, foto })

    // novo[0] => retorna o id do registro inserido                     
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const carroUpdate = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const { modelo, marca, ano, preco } = req.body

  if (!modelo || !marca || !ano || !preco) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe modelo, marca, ano e preco do veículo"
      })
    return
  }

  try {
    await dbKnex("carros").where({ id })
      .update({ modelo, marca, ano, preco })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }

}

export const carroDelete = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  try {
    await dbKnex("carros").where({ id }).del()
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const carroPesq = async (req, res) => {

  const { marca } = req.params

  try {
    // obtém da tabela de carros todos os registros da marca indicada
    const carros = await dbKnex("carros").whereLike('marca', marca)
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const carroIntervalo = async (req, res) => {

  const { from, to } = req.params

  try {
    // obtém da tabela de carros todos os registros do intervalo de anos indicado
    // em ordem de ano
    const carros = await dbKnex("carros").whereBetween("ano", [from, to]).orderBy('ano')
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const carroModelo = async (req, res) => {

  const { modelo } = req.params

  try {
    // obtém da tabela de carros todos os registros da modelo indicado
    const carros = await dbKnex("carros").whereLike('modelo', `%${modelo}%`)
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}
