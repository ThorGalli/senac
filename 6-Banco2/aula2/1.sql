CREATE TABLE empregado(
    nome VARCHAR(15) NOT NULL,
    matricula CHAR(9),
    dataNasc DATE,
    endereco VARCHAR(30),
    sexo CHAR(1),
    salario NUMERIC(10,2),
    supervisor CHAR(9),
    depto INT(11) NOT NULL,
    PRIMARY KEY (matricula),
    CHECK (salario >= 0),
    FOREIGN KEY (supervisor) REFERENCES empregado(matricula)
);

CREATE TABLE departamento(
    codDep int(11),
    nomeDep VARCHAR(15) NOT NULL,
    gerente CHAR(9) NOT NULL,
    dataInicioGer DATE,
    PRIMARY KEY(codDep),
    UNIQUE (nomeDep)
);

ALTER TABLE empregado
ADD CONSTRAINT empsuperfk
FOREIGN KEY (supervisor) REFERENCES empregado(matricula);

ALTER TABLE empregado
ADD CONSTRAINT empdepfk
FOREIGN KEY (depto) REFERENCES departamento(codDep);

ALTER TABLE departamento
ADD CONSTRAINT depgerfk
FOREIGN KEY (gerente) REFERENCES empregado(matricula);