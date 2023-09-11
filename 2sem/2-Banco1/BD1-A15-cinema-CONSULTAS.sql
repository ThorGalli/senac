-- a.  Apuração do público por município
SELECT SUM(sessao.publico) AS Publico,
       cidade.nome         AS Cidade
FROM   sessao
       INNER JOIN sala   ON sessao.sala_id   = sala.id
       INNER JOIN cinema ON sala.cinema_id   = cinema.id
       INNER JOIN cidade ON cinema.cidade_id = cidade.id
-- WHERE sessao.data = "2022-11-18"
GROUP  BY cidade.nome
ORDER  BY cidade.nome;

-- b.  Apuração do público por cinema
SELECT SUM(sessao.publico) AS Qtde,
       cinema.nomefantasia AS Cinema
FROM   sessao
       INNER JOIN sala   ON sessao.sala_id = sala.id
       INNER JOIN cinema ON sala.cinema_id = cinema.id
-- WHERE sessao.data = "2022-11-18"
GROUP  BY cinema.nomefantasia
ORDER  BY cinema.nomefantasia;

-- c.  Apuração do público por sessão de cada cinema
SELECT cinema.nomefantasia AS Cinema,
       sessao.horainicio   AS Horario,
       SUM(sessao.publico) AS Qtde
FROM   sessao
       INNER JOIN sala   ON sessao.sala_id = sala.id
       INNER JOIN cinema ON cinema.id      = sala.cinema_id
GROUP  BY sessao.horainicio,
          cinema.nomefantasia
ORDER  BY cinema.nomefantasia,
          sessao.horainicio;

/* d.  Dado um determinado ator, sejam localizados todos os cinemas
 onde estão em cartaz os filmes em que este ator atua */
SELECT cinema.nomefantasia  AS Cinema,
       filme.titulooriginal AS Filme,
       ator.nome            AS Ator
FROM   cinema
       INNER JOIN sala   ON cinema.id = sala.cinema_id
       INNER JOIN sessao ON sala.id   = sessao.sala_id
       INNER JOIN filme  ON filme.id  = sessao.filme_id
       INNER JOIN elenco ON filme.id  = elenco.filme_id
       INNER JOIN ator   ON ator.id   = elenco.ator_id
WHERE  ator.nome = 'Jason Clarke'
--     AND sessao.data = CURDATE(); 
       AND sessao.data = "2022-11-17"; 

-- e.  Em quais cinemas está sendo exibido um determinado gênero de filme
SELECT DISTINCT cidade.nome          AS Cidade,
                cinema.nomefantasia  AS Cinema,
                filme.titulooriginal AS Filme,
                genero.nome          AS Genero
FROM   cidade
       INNER JOIN cinema       ON cidade.id = cinema.cidade_id
       INNER JOIN sala         ON cinema.id = sala.cinema_id
       INNER JOIN sessao       ON sala.id   = sessao.sala_id
       INNER JOIN filme        ON filme.id  = sessao.filme_id
       INNER JOIN genero_filme ON filme.id  = genero_filme.filme_id
       INNER JOIN genero       ON genero.id = genero_filme.genero_id
WHERE  genero.nome = 'Drama'
--     AND sessao.data = CURDATE(); 
       AND sessao.data = "2022-11-17"; 

-- f.  Em quais cinemas estão sendo exibidos filmes nacionais
SELECT DISTINCT cidade.nome          AS Cidade,
                cinema.nomefantasia  AS Cinema,
                filme.titulooriginal AS Filme
FROM   cidade
       INNER JOIN cinema ON cidade.id = cinema.cidade_id
       INNER JOIN sala   ON cinema.id = sala.cinema_id
       INNER JOIN sessao ON sala.id   = sessao.sala_id
       INNER JOIN filme  ON filme.id  = sessao.filme_id
       INNER JOIN pais   ON pais.id   = filme.pais_id
WHERE  pais.nome = 'Brasil'
--     AND sessao.data = CURDATE(); 
       AND sessao.data = "2022-11-17"; 

