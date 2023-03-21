DROP DATABASE IF EXISTS aula02;
CREATE DATABASE IF NOT EXISTS aula02;
USE aula02;

CREATE TABLE teste (
    codigo INT,
    nome VARCHAR(15),
    email VARCHAR(30),
    PRIMARY KEY(codigo)
);

CREATE TABLE banana (
    id INT PRIMARY KEY AUTO_INCREMENT
);



ALTER TABLE teste
    ADD endereco CHAR(50) AFTER nome;

ALTER TABLE teste
    ADD nascimento DATE;
--
--
-- 
DESC teste;
