DROP DATABASE IF EXISTS aula02;
CREATE DATABASE IF NOT EXISTS aula02;
USE aula02;

CREATE TABLE fornecedor (
    codigo CHAR(10),
    nome VARCHAR(50) NOT NULL,
    cidade VARCHAR(80),
    PRIMARY KEY(codigo)
);

CREATE TABLE peca (
    codpeca CHAR(10),
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(100),
    PRIMARY KEY(codpeca)
);

CREATE TABLE venda (
    codforn CHAR(10),
    codpeca CHAR(10),
    quantidade INT NOT NULL,
    data DATE NOT NULL,
    PRIMARY KEY(codforn,codpeca),
    FOREIGN KEY (codforn) REFERENCES fornecedor(codigo) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (codpeca) REFERENCES peca(codpeca) ON DELETE RESTRICT ON UPDATE CASCADE
);