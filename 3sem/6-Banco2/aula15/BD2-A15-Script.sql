-- IMPORTAR ARQUIVO CSV
mysql --local-infile=1 -u root -p

DROP DATABASE IF EXISTS aula15;
CREATE DATABASE IF NOT EXISTS aula15;
USE aula15;

CREATE TABLE usuario (
  id    INT AUTO_INCREMENT,
  nome  VARCHAR(45) NOT NULL,
  email VARCHAR(255) NOT NULL,
  fone  VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

LOAD DATA LOCAL INFILE 'd:\temp\BD2-A15-arquivo.csv' 
INTO TABLE usuario 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

-- DICAS

-- #1
DROP TABLE IF EXISTS produto;
CREATE TABLE IF NOT EXISTS produto
  (
     id      INT(8) NOT NULL AUTO_INCREMENT,
     nome    VARCHAR(100),
     valor   DECIMAL(10, 2),
     estoque DECIMAL(10, 2),
     ativo   BOOLEAN,
     PRIMARY KEY (id)
  );
INSERT INTO produto VALUES (1,"Livro S", 99.99, 12, TRUE);
INSERT INTO produto VALUES (2,"Livro E", 89.99, 0, TRUE);
INSERT INTO produto VALUES (3,"Livro N", 49.99, 3, TRUE);
INSERT INTO produto VALUES (4,"Livro A", 56.38, 2, TRUE);
INSERT INTO produto VALUES (5,"Livro C", 32.41, 0, TRUE);

SELECT * FROM produto WHERE estoque = 0;

/*
+----+---------+-------+---------+-------+
| id | nome    | valor | estoque | ativo |
+----+---------+-------+---------+-------+
|  2 | Livro E | 89.99 |    0.00 |     1 |
|  5 | Livro C | 32.41 |    0.00 |     1 |
+----+---------+-------+---------+-------+
2 rows in set (0.00 sec) */


-- #2
DROP TABLE IF EXISTS produto;
CREATE TABLE IF NOT EXISTS produto
  (
     id      INT(8) NOT NULL AUTO_INCREMENT,
     nome    VARCHAR(100),
     valor   DECIMAL(10, 2),
     estoque DECIMAL(10, 2),
     ativo   BOOLEAN,
     PRIMARY KEY (id)
  );

INSERT INTO produto VALUES (8,"Livro X",-2.00, 12, TRUE);
-- Query OK, 1 row affected (0.00 sec)

DROP TABLE IF EXISTS produto;
CREATE TABLE IF NOT EXISTS produto
  (
     id      INT(8) NOT NULL AUTO_INCREMENT,
     nome    VARCHAR(100),
     valor   DECIMAL(10, 2),
     estoque DECIMAL(10, 2),
     ativo   BOOLEAN,
     PRIMARY KEY (id),
     CHECK(valor > 0)
  );

INSERT INTO produto VALUES (8,"Livro X",-2.00, 12, TRUE);
/* ERROR 3819 (HY000): 
Check constraint 'produto_chk_1' is violated.*/

-- #3
DROP TABLE IF EXISTS produto;
CREATE TABLE IF NOT EXISTS produto
  (
     id      INT(8) NOT NULL AUTO_INCREMENT,
     nome    VARCHAR(100),
     valor   DECIMAL(10, 2),
     estoque DECIMAL(10, 2),
     ativo   BOOLEAN,
     PRIMARY KEY (id),
     CHECK(valor > 0)
  );

INSERT INTO produto VALUES (10,"Livro A",1.09, 10, TRUE);
INSERT INTO produto VALUES (11,"Livro B",2000.56, 12, TRUE);
INSERT INTO produto VALUES (12,"Livro C",3000.99, 2, FALSE);
INSERT INTO produto VALUES (13,"Livro D",45.99, 9, TRUE);
INSERT INTO produto VALUES (14,"Livro E",2.99, 11, FALSE);
INSERT INTO produto VALUES (15,"Livro F",80.19, 10, FALSE);
INSERT INTO produto VALUES (16,"Livro G",39.21, 10, TRUE);
INSERT INTO produto VALUES (17,"Livro H",68.23, 8, TRUE);
INSERT INTO produto VALUES (19,"Livro I",2.00, 3, TRUE);
INSERT INTO produto VALUES (20,"Livro J",2500.38, 4, FALSE);

SELECT *
FROM   produto
WHERE  ativo = true
   AND valor < 10
    OR valor > 1000;


SELECT *
FROM   produto
WHERE  ativo = true
   AND (valor < 10
    OR valor > 1000);

-- #4

CREATE TABLE produtoClone LIKE produto;

INSERT INTO produtoClone
SELECT *
FROM produto;

CREATE TEMPORARY TABLE produtoClone LIKE produto;

-- #5

DROP TABLE IF EXISTS produto;
CREATE TABLE IF NOT EXISTS produto
  (
     id      INT(8) NOT NULL AUTO_INCREMENT,
     nome    VARCHAR(100),
     valor   DECIMAL(10, 2),
     estoque DECIMAL(10, 2),
     ativo   BOOLEAN,
     PRIMARY KEY (id),
     CHECK(valor > 0)
  );

INSERT INTO produto VALUES (21,NULL,38.42, 4, TRUE);
INSERT INTO produto VALUES (22,'',37.42, 8, TRUE);
INSERT INTO produto VALUES (23,"Livro XA",36.42, 10, TRUE);
INSERT INTO produto VALUES (24,"",35.42, 11, TRUE);
INSERT INTO produto VALUES (25,'Livro XB',34.42, 15, TRUE);
INSERT INTO produto VALUES (26,'Livro XC',33.42, 2, TRUE);
INSERT INTO produto VALUES (27,'Livro XD',32.42, 8, TRUE);
INSERT INTO produto VALUES (28,NULL,31.42, 4, TRUE);
INSERT INTO produto VALUES (29,'Livro XE',30.42, 3, TRUE);
INSERT INTO produto VALUES (30,'Livro XF',9.32, 2, TRUE);
INSERT INTO produto (valor, estoque, ativo) VALUES (9.32, 2, TRUE);
INSERT INTO produto (valor, estoque, ativo) VALUES (8.45, 3, TRUE);

SELECT COUNT(nome) FROM produto;
/*
+-------------+
| COUNT(nome) |
+-------------+
|          18 |
+-------------+
1 row in set (0.00 sec)*/

SELECT COUNT(id) FROM produto;
/*
+-----------+
| COUNT(id) |
+-----------+
|        22 |
+-----------+
1 row in set (0.00 sec)*/

-- #6
SELECT id, nome, valor 
FROM produto 
WHERE nome = '';
/*
+----+------+-------+
| id | nome | valor |
+----+------+-------+
| 22 |      | 37.42 |
| 24 |      | 35.42 |
+----+------+-------+
2 rows in set (0.00 sec)*/

SELECT id, nome, valor 
FROM produto 
WHERE nome IS NULL;
/*
+----+------+-------+
| id | nome | valor |
+----+------+-------+
| 21 | NULL | 38.42 |
| 28 | NULL | 31.42 |
| 31 | NULL |  9.32 |
| 32 | NULL |  8.45 |
+----+------+-------+
4 rows in set (0.00 sec)*/


SELECT * 
FROM produto 
WHERE (nome = '' OR nome IS NULL);
/*
+----+------+-------+---------+-------+
| id | nome | valor | estoque | ativo |
+----+------+-------+---------+-------+
| 21 | NULL | 38.42 |    4.00 |     1 |
| 22 |      | 37.42 |    8.00 |     1 |
| 24 |      | 35.42 |   11.00 |     1 |
| 28 | NULL | 31.42 |    4.00 |     1 |
| 31 | NULL |  9.32 |    2.00 |     1 |
| 32 | NULL |  8.45 |    3.00 |     1 |
+----+------+-------+---------+-------+
6 rows in set (0.00 sec)*/


-- Dica: Usar o valor padrão. Usar o DEFAULT:

UPDATE produto SET nome = '' WHERE nome IS NULL;


-- #7

ALTER TABLE produto
  MODIFY COLUMN nome VARCHAR(100) DEFAULT '' NULL;

UPDATE produto
SET    nome = NULL
WHERE  nome = '';

SELECT id, nome, COALESCE(nome, "Não informado")
FROM   produto; 

-- #8


DROP TABLE IF EXISTS venda;
CREATE TABLE IF NOT EXISTS venda
  (
     id        INT auto_increment,
     produtora VARCHAR (20) DEFAULT '',
     valor     DECIMAL (10, 2) DEFAULT 0,
     PRIMARY KEY (id)
  ); 

INSERT INTO venda (produtora, valor) VALUES
  ('Microsoft', 100.00),
  ('Ubisoft', 99.00),
  ('Microsoft', 89.00),
  ('EA Games', 88.00),
  ('EA Games', 50.00),
  ('Microsoft', 80.00),
  ('', 0.00),
  ('', 100.00),
  ('Ubisoft', 0.00),
  ('EA Games', 100.00),
  ('Microsoft', 100.00),
  ('Microsoft', 100.00),
  ('EA Games', NULL),
  ('Microsoft', 0.00),
  ('EA Games', 100.00),
  ('', 0.00),
  ('Microsoft', 100.00),
  ('Ubisoft', 100.00),
  ('Ubisoft', 100.00),
  (NULL, NULL),
  ('Microsoft', 100.00),
  (NULL, 100.00),
  ('Microsoft', 100.00),
  ('Ubisoft', 100.00),
  ('Ubisoft', 100.00),
  (NULL, 100.00);

SELECT produtora, SUM(valor) AS total 
FROM venda 
GROUP BY produtora
ORDER BY produtora;


SELECT produtora,
       total
FROM   (SELECT produtora,
               SUM(valor) AS total
        FROM   venda
        GROUP  BY produtora) AS temp
WHERE  total > 400
ORDER BY produtora;
/*
+-----------+--------+
| produtora | total  |
+-----------+--------+
| Microsoft | 769.00 |
| Ubisoft   | 499.00 |
+-----------+--------+
2 rows in set (0.00 sec)*/

SELECT produtora,
       SUM(valor) AS vendas
FROM   venda
GROUP  BY produtora
HAVING vendas > 400
ORDER BY produtora; 
+-----------+--------+
| produtora | vendas |
+-----------+--------+
| Microsoft | 769.00 |
| Ubisoft   | 499.00 |
+-----------+--------+
2 rows in set (0.00 sec)


-- #9

-- MySQL
SHOW TABLES; -- (Que barbada esse tal de MySQL)

-- Microsoft SQL Server
SELECT *
FROM   information_schema.TABLES;

-- ORACLE - Minhas tabelas
SELECT table_name
FROM   user_tables;

-- ORACLE - Todas tabelas que tenho acesso
SELECT table_name
FROM   all_tables;

-- POSTGRESQL
SELECT *
FROM   pg_catalog.pg_tables;

-- #10

DROP TABLE IF EXISTS alunos;
CREATE TABLE IF NOT EXISTS alunos(
  id INT NOT NULL,
  nome VARCHAR(45)
);

DELIMITER $$
CREATE TRIGGER TRG_bloqueador
BEFORE INSERT
ON alunos
FOR EACH ROW
BEGIN
  IF (NEW.id < 10) THEN
    SET NEW.id = NULL;
  END IF;
END;
$$
DELIMITER ;


INSERT INTO alunos (id, nome) VALUES (1, 'Tiririca');

INSERT INTO alunos (id, nome) VALUES (22, 'Tiririca');



DELIMITER $$
CREATE PROCEDURE SP_legal (v_id INT, v_nome VARCHAR(45))
BEGIN
  DECLARE EXIT HANDLER FOR SQLSTATE '23000'
  BEGIN
    SELECT 'INCLUSÃO NÃO EFETUADA' AS MSG;
  END;
  INSERT INTO alunos (id, nome) VALUES (v_id, v_nome);
  SELECT 'INCLUSÃO OK' AS MSG;
END;
$$
DELIMITER ;

CALL SP_legal (1, 'Tiririca');

CALL SP_legal (33, 'Tiririca');


-- PIVOTAMENTO (Parte 1)

DROP TABLE IF EXISTS criador;
CREATE TABLE IF NOT EXISTS criador (
  id   INT(8)  NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS animal;
CREATE TABLE IF NOT EXISTS animal (
  id        INT(8)  NOT NULL AUTO_INCREMENT,
  sexo      CHAR(1) NOT NULL,
  idCriador INT(8)  NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE animal
  ADD CONSTRAINT FK_criador FOREIGN KEY (idCriador) REFERENCES criador (id);

INSERT INTO criador (nome)
VALUES
('Pablitus'),
('Angelina'),
('ReiDecio'),
('GladiMau');

INSERT INTO animal (sexo, idCriador)
VALUES
('F', 1),
('F', 2),
('F', 3),
('F', 1),
('F', 2),
('F', 1),
('F', 2),
('M', 1),
('M', 2),
('M', 1),
('M', 3),
('M', 1),
('M', 3),
('M', 1),
('M', 2),
('M', 1),
('M', 1),
('M', 1),
('M', 1),
('F', 2),
('F', 3),
('M', 3);

SELECT * FROM criador;

SELECT * FROM animal;

SELECT
  criador.nome AS 'Criador',
  animal.sexo AS 'Animal Sexo',
  COUNT(animal.sexo) AS 'Total'
FROM criador
LEFT JOIN animal ON criador.id = animal.idCriador
GROUP BY criador.nome, animal.sexo
ORDER BY criador.nome;

/*
+----------+-------------+-------+
| Criador  | Animal Sexo | Total |
+----------+-------------+-------+
| Angelina | F           |     4 |
| Angelina | M           |     2 |
| GladiMau | NULL        |     0 |
| Pablitus | F           |     3 |
| Pablitus | M           |     8 |
| ReiDecio | F           |     2 |
| ReiDecio | M           |     3 |
+----------+-------------+-------+
7 rows in set (0.00 sec)
*/

SELECT
  criador.nome,
  SUM(CASE WHEN (animal.sexo = 'F') THEN 1 ELSE 0 END) AS 'Total Femeas',
  SUM(CASE WHEN (animal.sexo = 'M') THEN 1 ELSE 0 END) AS 'Total Machos',
  COUNT(animal.sexo) AS 'Total Geral'
FROM criador
LEFT JOIN animal ON criador.id = animal.idCriador
GROUP BY criador.nome
ORDER BY criador.nome;

/*
+----------+--------------+--------------+-------------+
| nome     | Total Femeas | Total Machos | Total Geral |
+----------+--------------+--------------+-------------+
| Angelina |            4 |            2 |           6 |
| GladiMau |            0 |            0 |           0 |
| Pablitus |            3 |            8 |          11 |
| ReiDecio |            2 |            3 |           5 |
+----------+--------------+--------------+-------------+
4 rows in set (0.00 sec)
*/

-- EXEMPLO 2

DROP TABLE IF EXISTS pergunta;
CREATE TABLE pergunta (
   id        INT(11) NOT NULL AUTO_INCREMENT,
   descricao VARCHAR(256) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE KEY (descricao)
);

DROP TABLE IF EXISTS reposta;
CREATE TABLE resposta (
   id         INT(11) NOT NULL AUTO_INCREMENT,
   idPergunta INT(11) NOT NULL,
   resposta VARCHAR(256) NOT NULL DEFAULT 'Sem resposta',
   PRIMARY KEY (id)
);

ALTER TABLE resposta
  ADD CONSTRAINT FK_pergunta FOREIGN KEY (idPergunta) REFERENCES pergunta (id);

INSERT INTO pergunta
VALUES
(1, 'Qual banco de dados SQL você prefere?'),
(2, 'Qual banco de dados SQL você irá usar em seu próximo projeto?');

INSERT INTO resposta
VALUES
(1,1,'MySQL'),
(2,1,'MySQL'),
(3,1,'MySQL'),
(4,1,'Oracle'),
(5,1,'PostgreSQL'),
(6,1,'MySQL'),
(9,1,'MSSQLServer'),
(10,1,'MySQL'),
(11,1,'Oracle'),
(12,1,'PostgreSQL'),
(13,1,'MySQL'),
(16,1,'MySQL'),
(17,1,'MySQL'),
(18,1,'Oracle'),
(19,1,'PostgreSQL'),
(20,1,'MySQL'),
(23,2,'Oracle'),
(29,2,'MySQL'),
(30,2,'MySQL'),
(31,2,'MySQL'),
(32,2,'MySQL'),
(33,2,'MySQL'),
(34,2,'PostgreSQL'),
(35,2,'PostgreSQL'),
(36,2,'PostgreSQL'),
(52,2,'Oracle'),
(53,2,'Oracle'),
(54,2,'Oracle'),
(55,2,'Oracle'),
(56,2,'Oracle'),
(57,2,'Oracle'),
(58,2,'MySQL'),
(59,2,'MySQL'),
(60,2,'MySQL'),
(61,2,'MySQL'),
(62,2,'MySQL'),
(63,2,'MySQL'),
(64,2,'MySQL'),
(65,2,'MSSQLServer'),
(66,2,'MySQL'),
(67,2,'MySQL'),
(68,2,'MySQL'),
(69,2,'MySQL'),
(70,2,'MySQL'),
(71,2,'MySQL'),
(72,2,'MySQL'),
(73,2,'MySQL'),
(74,2,'MySQL'),
(75,2,'MSSQLServer'),
(76,2,'MySQL'),
(77,2,'MySQL'),
(78,2,'PostgreSQL'),
(79,2,'PostgreSQL'),
(80,2,'PostgreSQL'),
(81,2,'MSSQLServer'),
(82,2,'PostgreSQL'),
(83,2,'PostgreSQL');

-- Consulta normal
SELECT pergunta.descricao, resposta.resposta, COUNT(resposta.resposta)
FROM  pergunta
LEFT JOIN resposta ON pergunta.id = resposta.idPergunta
GROUP BY pergunta.descricao, resposta.resposta
ORDER BY pergunta.descricao;

/*
+---------------------------------------------------------------+-------------+--------------------------+
| descricao                                                     | resposta    | COUNT(resposta.resposta) |
+---------------------------------------------------------------+-------------+--------------------------+
| Qual banco de dados SQL você irá usar em seu próximo projeto? | MSSQLServer |                        3 |
| Qual banco de dados SQL você irá usar em seu próximo projeto? | MySQL       |                       23 |
| Qual banco de dados SQL você irá usar em seu próximo projeto? | Oracle      |                        7 |
| Qual banco de dados SQL você irá usar em seu próximo projeto? | PostgreSQL  |                        8 |
| Qual banco de dados SQL você prefere?                         | MSSQLServer |                        1 |
| Qual banco de dados SQL você prefere?                         | MySQL       |                        9 |
| Qual banco de dados SQL você prefere?                         | Oracle      |                        3 |
| Qual banco de dados SQL você prefere?                         | PostgreSQL  |                        3 |
+---------------------------------------------------------------+-------------+--------------------------+
8 rows in set (0.00 sec)
*/

-- Resultado desejado
/*
+---------------------------------------------------------------+-------+--------+------------+-------------+
| descricao                                                     | MySQL | Oracle | PostgreSQL | MSSQLServer |
+---------------------------------------------------------------+-------+--------+------------+-------------+
| Qual banco de dados SQL você irá usar em seu próximo projeto? |    23 |      7 |          8 |           3 |
| Qual banco de dados SQL você prefere?                         |     9 |      3 |          3 |           1 |
+---------------------------------------------------------------+-------+--------+------------+-------------+
2 rows in set (0.00 sec)
*/


-- Consulta com PIVOTAMENTO usando IF
SELECT
  pergunta.descricao,
  SUM(IF(resposta.resposta = 'MySQL',       1, 0)) AS 'MySQL',
  SUM(IF(resposta.resposta = 'Oracle',      1, 0)) AS 'Oracle',
  SUM(IF(resposta.resposta = 'PostgreSQL',  1, 0)) AS 'PostgreSQL',
  SUM(IF(resposta.resposta = 'MSSQLServer', 1, 0)) AS 'MSSQLServer'
FROM pergunta
INNER JOIN resposta ON resposta.idPergunta = pergunta.id
GROUP BY pergunta.id, pergunta.descricao
ORDER BY pergunta.descricao;

-- Consulta com PIVOTAMENTO usando CASE
  SELECT
    pergunta.descricao,
    SUM(CASE WHEN (resposta.resposta = 'MySQL')       THEN 1 ELSE 0 END) AS 'MySQL',
    SUM(CASE WHEN (resposta.resposta = 'Oracle')      THEN 1 ELSE 0 END) AS 'Oracle',
    SUM(CASE WHEN (resposta.resposta = 'PostgreSQL')  THEN 1 ELSE 0 END) AS 'PostgreSQL',
    SUM(CASE WHEN (resposta.resposta = 'MSSQLServer') THEN 1 ELSE 0 END) AS 'MSSQLServer'
  FROM pergunta
  INNER JOIN resposta ON resposta.idPergunta = pergunta.id
  GROUP BY pergunta.id, pergunta.descricao
  ORDER BY pergunta.descricao;

-- Mais um exemplo de PIVOTAMENTO
DROP TABLE IF EXISTS teste_pivot;
CREATE TABLE teste_pivot (
  id      INT NOT NULL AUTO_INCREMENT,
  empresa VARCHAR(45) DEFAULT NULL,
  meio    VARCHAR(45) DEFAULT NULL,
  qtd     INT DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM;

INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Krolow', 'IMPRESSO', 1);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Krolow', 'IMPRESSO', 1);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Krolow', 'IMPRESSO', 3);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Krolow', 'IMPRESSO', 1);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Guanabara', 'SMS', NULL);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Guanabara', 'IMPRESSO', 1);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Guanabara', 'IMPRESSO', 1);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Guanabara', 'IMPRESSO', 2);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Guanabara', 'IMPRESSO', 4);
INSERT INTO teste_pivot (empresa, meio, qtd) VALUES ('Guanabara', 'IMPRESSO', 4);



-- Consulta simples
SELECT empresa, meio, qtd, COUNT(qtd) 
FROM teste_pivot 
GROUP BY empresa, meio, qtd
ORDER BY empresa, meio, qtd;

/*
+-----------+----------+------+------------+
| empresa   | meio     | qtd  | COUNT(qtd) |
+-----------+----------+------+------------+
| Guanabara | IMPRESSO |    1 |          2 |
| Guanabara | IMPRESSO |    2 |          1 |
| Guanabara | IMPRESSO |    4 |          2 |
| Guanabara | SMS      | NULL |          0 |
| Krolow    | IMPRESSO |    1 |          3 |
| Krolow    | IMPRESSO |    3 |          1 |
+-----------+----------+------+------------+
6 rows in set (0.00 sec)
*/

-- Resultado desejado 
/*
+-----------+-----+----------+----------+----------+
| empresa   | SMS | IMPR.1pg | IMPR.2pg | IMPR.3pg |
+-----------+-----+----------+----------+----------+
| Guanabara |   1 |        2 |        1 |        0 |
| Krolow    |   0 |        3 |        0 |        1 |
+-----------+-----+----------+----------+----------+
2 rows in set (0.00 sec)
*/

-- Consulta usando PIVOTAMENTO com CASE
SELECT  p.empresa,
    COUNT(
        CASE 
            WHEN p.meio='SMS' 
            THEN 1 
            ELSE NULL 
        END
    ) AS 'SMS',
    COUNT(
        CASE 
            WHEN p.meio='IMPRESSO' AND p.qtd = '1' 
            THEN p.qtd 
            ELSE NULL 
        END
    ) AS 'IMPR.1pg',
    COUNT(
        CASE 
            WHEN p.meio='IMPRESSO' AND p.qtd = '2' 
            THEN p.qtd 
            ELSE NULL 
        END
    ) AS 'IMPR.2pg',
    COUNT(
        CASE 
            WHEN p.meio='IMPRESSO' AND p.qtd = '3' 
            THEN p.qtd 
            ELSE NULL 
        END
    ) AS 'IMPR.3pg',
    COUNT(
        CASE 
            WHEN p.meio='IMPRESSO' AND p.qtd = '4' 
            THEN p.qtd 
            ELSE NULL 
        END
    ) AS 'IMPR.4pg'
FROM    teste_pivot p
GROUP BY p.empresa
ORDER BY p.empresa;
