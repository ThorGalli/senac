/* 1) Adaptar as seguintes alterações no script de criação do banco de dados utilizado no banco cinema:
 a. Criar a tabela usuario, contendo os campos id, nome, email, cidade_id. */
DROP TABLE IF EXISTS usuario;
CREATE TABLE IF NOT EXISTS usuario (
  id INT(11) NOT NULL AUTO_INCREMENT,
  cidade_id INT(11) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(50) NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_usuario_cidade FOREIGN KEY (cidade_id) REFERENCES cidade (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/* b. Criar a tabela venda (com os campos data, hora e valorIngresso), relacionar esta tabela com a 
 tabela sessao. Em seguida criar um relacionamento entre as tabelas usuario e venda. */
DROP TABLE IF EXISTS venda;
CREATE TABLE IF NOT EXISTS venda (
  sessao_id INT(11) NOT NULL,
  usuario_id INT(11) NOT NULL,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  valorIngresso INT(11) NOT NULL,
  CONSTRAINT fk_venda_sessao FOREIGN KEY (sessao_id) REFERENCES sessao (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_venda_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/* c. Criar INSERT’s de dados necessários a fim de cadastrar 10 usuários, e seguida cadastrar 50 vendas 
 de ingressos; */
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Rodrigo Silva", 2, "fulano@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Rodrigo Alves", 1, "fulano2@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Cândido Hyppolito", 5, "fulano3@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Cândido Silva", 2, "fulano4@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Cleonice Monteiro", 4, "fulano5@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Cleonice Alves", 2, "fulano6@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Glad Mir", 3, "fulano7@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Gabriel Silva", 6, "fulano8@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Eros Streck", 1, "fulano9@gmail.com");
INSERT INTO usuario (nome, cidade_id, email)
VALUES ("Gael Matos", 1, "fulano10@gmail.com");
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (1, 1, '2022-02-01', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (2, 2, '2022-02-02', '23:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (3, 3, '2022-02-03', '19:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (4, 4, '2022-02-04', '21:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (5, 5, '2022-02-05', '20:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (6, 6, '2022-02-06', '18:15:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (7, 7, '2022-02-07', '22:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (8, 8, '2022-02-08', '15:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (9, 9, '2022-02-09', '13:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (10, 10, '2022-02-10', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (11, 1, '2022-02-11', '16:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (12, 2, '2022-02-12', '22:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (13, 3, '2022-02-13', '14:50:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (14, 4, '2022-02-14', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (15, 5, '2022-02-15', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (16, 6, '2022-02-16', '19:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (17, 7, '2022-02-17', '17:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (18, 8, '2022-02-18', '23:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (19, 9, '2022-02-19', '20:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (20, 10, '2022-02-20', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (21, 1, '2022-02-21', '21:15:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (22, 2, '2022-02-22', '12:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (23, 3, '2022-02-23', '18:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (24, 4, '2022-02-24', '19:40:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (25, 5, '2022-02-25', '20:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (1, 6, '2022-02-01', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (2, 7, '2022-02-02', '23:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (3, 8, '2022-02-03', '19:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (4, 9, '2022-02-04', '21:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (5, 10, '2022-02-05', '20:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (6, 1, '2022-02-06', '18:15:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (7, 2, '2022-02-07', '22:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (8, 3, '2022-02-08', '15:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (9, 4, '2022-02-09', '13:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (10, 5, '2022-02-10', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (11, 6, '2022-02-11', '16:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (12, 7, '2022-02-12', '22:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (13, 8, '2022-02-13', '14:50:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (14, 9, '2022-02-14', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (15, 10, '2022-02-15', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (16, 1, '2022-02-16', '19:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (17, 2, '2022-02-17', '17:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (18, 3, '2022-02-18', '23:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (19, 4, '2022-02-19', '20:00:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (20, 5, '2022-02-20', '21:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (21, 6, '2022-02-21', '21:15:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (22, 7, '2022-02-22', '12:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (23, 8, '2022-02-23', '18:30:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (24, 9, '2022-02-24', '19:40:00', 15);
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES (25, 10, '2022-02-25', '20:30:00', 15);
/* 2) Criar as seguintes consultas:
 a. Crie uma consulta que liste todos os nomes dos filmes, gêneros e duração, ordenados por gênero e em 
 seguida em ordem decrescente de tituloOriginal de Filme; */
SELECT filme.tituloOriginal,
  genero.nome,
  filme.duracao
FROM filme
  INNER JOIN genero_filme ON genero_filme.filme_id = filme.id
  INNER JOIN genero ON genero.id = genero_filme.genero_id
ORDER BY genero.id,
  tituloOriginal DESC;
/* b. Selecionar os títulos dos filmes em ordem inversa de título; */
SELECT filme.tituloOriginal
FROM filme
ORDER BY filme.tituloOriginal DESC;
/* c. Utilizando o operador IN, crie uma consulta para que liste o nome de todos os gêneros menos os gêneros 
 de suspense, terror e comédia; */
SELECT genero.nome
FROM genero
WHERE genero.nome IN (
    'Ficção',
    'Drama',
    'Ação',
    'Faroeste',
    'Aventura'
  );
/* d. Utilizando subconsultas, crie uma consulta que retorne os títulos, gênero e duração de filmes em que o 
 gênero seja SUSPENSE e a duração esteja entre 70 e 130 minutos; */
SELECT filme.tituloOriginal,
  genero.nome,
  filme.duracao
FROM filme
  INNER JOIN genero_filme ON genero_filme.filme_id = filme.id
  INNER JOIN genero ON genero.id = genero_filme.genero_id
WHERE genero.nome IN ('Suspense')
  AND (filme.duracao < 130 && filme.duracao > 70);