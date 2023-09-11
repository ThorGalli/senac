const getToday = () => new Date(Date.now()).toISOString().split("T")[0];

const noticias = [
  {
    titulo: "Lorem Ipsum",
    descricao: "lorem ipsum banana frita, hoje eu comi comida salgada no almoço.",
    data: getToday(),
    autor: "Renata",
    curtidas: 16,
  },
  {
    titulo: "Novos Livros",
    descricao: "Já chegaram novos livros na escola, favor entrar em contato para garantir o seu",
    data: getToday(),
    autor: "Renata",
    curtidas: 16,
  },
  {
    titulo: "Feriado Nacional",
    descricao: "Gente, não teremos aula nessa sexta feira devido ao feriado!",
    data: getToday(),
    autor: "Renata",
    curtidas: 16,
  },
  {
    titulo: "Lindos Gatinhos",
    descricao:
      "Olhem só que lindo o chico deitado bem grudadinho na lareira! Está tão frio que nem os gatos estão aguentando...",
    data: getToday(),
    autor: "Renata",
    curtidas: 16,
  },
];

export const feedIndex = (req, res) => {
  res.send(noticias);
};

export const feedPost = (req, res) => {
  const { titulo, descricao, autor, curtidas } = req.body;
  noticias.push({
    titulo,
    descricao,
    data: new Date(Date.now()).toISOString(),
    autor,
    curtidas: curtidas || 0,
  });
  res.json(titulo + " Adicionada.");
};

export const feedUpdate = (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, data, autor, curtidas } = req.body;

  if (id > noticias.length || id < 0) {
    res.json({ msg: "Erro... Código inválido" });
    return;
  }

  const currentNoticia = noticias[id - 1];
  const previousTitle = currentNoticia.titulo;

  noticias[id - 1].titulo = titulo || currentNoticia.titulo;
  noticias[id - 1].descricao = descricao || currentNoticia.descricao;
  noticias[id - 1].data = data || currentNoticia.data;
  noticias[id - 1].autor = autor || currentNoticia.autor;
  noticias[id - 1].curtidas = curtidas || currentNoticia.curtidas;

  res.json(previousTitle + "  atualizado.");
};

export const feedDelete = (req, res) => {
  const id = Number(req.params.id);

  if (id > noticias.length || id < 0) {
    res.json({ msg: "Erro... Código inválido" });
    return;
  }

  res.json({ deletedObject: noticias.splice(id - 1, 1) });
};

export const feedShow = (req, res) => {
  const id = Number(req.params.id);

  if (id > noticias.length || id < 0) {
    res.json({ msg: "Erro... Código inválido" });
    return;
  }
  res.json(noticias[id - 1]);
};
