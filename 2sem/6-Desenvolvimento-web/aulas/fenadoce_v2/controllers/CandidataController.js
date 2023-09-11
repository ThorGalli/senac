import dbKnex from '../dados/db_config.js'

export const candidataIndex = async (req, res) => {
  try {
    // obtém da tabela de candidatas todos os registros
    const candidatas = await dbKnex.select("*").from("candidatas")
    res.status(200).json(candidatas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const candidataStore = async (req, res) => {

  // informações que podem ser obtidas do arquivo enviado
  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const foto = req.file.path; // obtém o caminho do arquivo no server

  if ((req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") || req.file.size > 1024 * 1024) {
    fs.unlinkSync(foto); // exclui o arquivo do servidor
    res
      .status(400)
      .json({ msg: "Formato inválido da imagem ou imagem muito grande" });
    return;
  }

  // atribui via desestruturação
  const { nome, idade, clube } = req.body

  // se não informou estes atributos
  if (!nome || !idade || !clube || !foto) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, idade, clube e foto da candidata" })
    return
  }

  try {
    const novo = await dbKnex('candidatas').insert({ nome, idade, clube, foto })

    // novo[0] => retorna o id do registro inserido                     
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const candidataUpdate = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const { nome, idade, clube } = req.body

  if (!nome || !idade || !clube) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe nome, idade e clube da candidata"
      })
    return
  }

  try {
    await dbKnex("candidatas").where({ id })
      .update({ nome, idade, clube })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }

}

export const candidataDelete = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  try {
    await dbKnex("candidatas").where({ id }).del()
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const candidataPesq = async (req, res) => {

  const { idade } = req.params

  try {
    // obtém da tabela de candidatas todos os registros da marca indicada
    const candidatas = await dbKnex("candidatas").where('idade', '>=', idade)
    res.status(200).json(candidatas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}
