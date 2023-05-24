
/* 1)  Utilizando o operador IN, crie uma consulta para que liste o nome de 
todos os gêneros menos os gêneros de suspense, terror e comédia; */
SELECT f.tituloOriginal AS "Filme"
FROM filme f
INNER JOIN genero g ON f.idGenero = g.id
WHERE f.idGenero NOT IN (SELECT g.id WHERE g.nome IN ("Suspense", "Terror", "Comédia"));

/* 2)  Utilizando subconsultas, crie uma consulta que retorne os títulos, gênero e duração de filmes 
em que o gênero seja SUSPENSE e a duração esteja entre 70 e 130 minutos; */
SELECT f.tituloOriginal AS "Filme", g.nome AS "Genero", f.duracao AS "Duração"
FROM filme f
INNER JOIN genero g ON f.idGenero = g.id
WHERE f.idGenero IN (SELECT g.id WHERE g.nome IN ("Suspense")) AND
      (f.duracao BETWEEN 70 AND 130);

/* 3)  Crie uma function incrementar +44min em todos os filmes de um determinado gênero 
(o gênero é passado como parâmetro); */
DROP FUNCTION IF EXISTS increment_Time;

DELIMITER $$
CREATE FUNCTION aumenta_duracao(nomeGenero VARCHAR(45)) RETURNS VARCHAR(45) DETERMINISTIC
BEGIN
    UPDATE filme
    SET filme.duracao = filme.duracao + 44
    WHERE filme.idGenero IN (SELECT genero.id
                             FROM genero
                             WHERE genero.nome = nomeGenero);
    RETURN "OK";
END $$
DELIMITER ;
-- Exemplo de chamada da função: SELECT aumenta_duracao ("Suspense");

/* 4)  Crie uma procedure que recebe o nome de um ator 
e informa os filmes que ele participou; */
DROP PROCEDURE IF EXISTS ator_filme;

DELIMITER $$
CREATE PROCEDURE ator_filme(nomeAtor VARCHAR(45))
BEGIN
    SELECT f.tituloOriginal AS "Filme"
    FROM filme f
    INNER JOIN elenco e ON f.id = e.idFilme
    INNER JOIN ator a   ON a.id = e.idAtor
    WHERE a.nome = nomeAtor;
END $$
DELIMITER ;
-- Exemplo de chamada da procedure: CALL ator_filme ("Emmanuelle Riva");

/* 5)  Crie uma procedure que informe o nome dos atores 
que não participaram de nenhum filme; */
DROP PROCEDURE IF EXISTS ator_desempregado;

DELIMITER $$
CREATE PROCEDURE ator_desempregado()
BEGIN
    SELECT a.nome AS "Ator"
    FROM ator a
    WHERE a.id NOT IN (
        SELECT a.id FROM ator a 
        INNER JOIN elenco e ON a.id = e.idAtor)
    ORDER BY a.nome;
END $$
DELIMITER ;
-- Exemplo de chamada da procedure: CALL ator_desempregado;

/* 6)  Crie uma procedure que exiba o título e o gênero de todos os filmes 
que não passaram ainda em cinema algum; */
DROP PROCEDURE IF EXISTS filme_nao_passou;

DELIMITER $$
CREATE PROCEDURE filme_nao_passou()
BEGIN
    SELECT f.tituloOriginal AS "Filme", g.nome AS "Genero"
    FROM filme f
    INNER JOIN genero g ON f.idGenero = g.id
    WHERE f.id NOT IN (SELECT sessao.idFilme FROM sessao)
    ORDER BY f.tituloOriginal;
END $$
DELIMITER ;
-- Exemplo de chamada da procedure: filme_nao_passou;

/* 7)  Crie uma procedure que receba como parâmetro o nome de uma cidade 
e exiba os cinemas existentes nesta cidade; */
DROP PROCEDURE IF EXISTS cinema_cidade;

DELIMITER $$
CREATE PROCEDURE cinema_cidade(nomeCidade VARCHAR(45))
BEGIN
    SELECT cinema.nomeFantasia AS "Cinema"
    FROM cinema
    INNER JOIN cidade ON cinema.idCidade = cidade.id
    WHERE cidade.nome = nomeCidade
    ORDER BY cinema.nomeFantasia;
END $$
DELIMITER ;
-- Exemplo de chamada da procedure: CALL cinema_cidade("Pelotas");

/* 8)  Crie uma procedure que receba dois parâmetros (gênero atual, gênero novo) 
e altere o gênero dos filmes de acordo com os parâmetros recebidos. */
DROP PROCEDURE IF EXISTS altera_genero;

DELIMITER $$
CREATE PROCEDURE altera_genero(generoAntigo VARCHAR(45), generoNovo VARCHAR(45)) 
BEGIN
    UPDATE genero
    SET genero.nome = generoNovo
    WHERE genero.nome = generoAntigo;
END $$
DELIMITER ;
-- Exemplo de chamada da função: CALL altera_genero ("Suspense", "Pânico");

SHOW PROCEDURE STATUS WHERE db = 'AULA08';

SHOW FUNCTION STATUS WHERE db = 'AULA08';

