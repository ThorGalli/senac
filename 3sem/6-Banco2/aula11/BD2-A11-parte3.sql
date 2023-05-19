DROP DATABASE IF EXISTS aula11;
CREATE DATABASE IF NOT EXISTS aula11;
USE aula11;

CREATE TABLE t1(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	valor INT NOT NULL
) ENGINE=MyISAM;
CREATE INDEX idx_t1valor ON t1(valor);

create TABLE t2(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	valor INT NOT NULL
) ENGINE=MyISAM;
 
CREATE TABLE t3(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    valor INT NOT NULL
) ENGINE=INNODB;
CREATE INDEX idx_t3valor ON t3(valor);
 
create TABLE t4(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    valor INT NOT NULL
) ENGINE=INNODB;

DELIMITER $$
CREATE PROCEDURE gerandodados(IN qtdLinhas INT, IN minVal INT, IN maxVal INT)
    BEGIN
        DECLARE i INT;
        DECLARE tmp INT;
        SET i = 1;
        START TRANSACTION;
        WHILE i <= qtdLinhas DO
            SET tmp = minVal + CEIL(RAND() * (maxVal - minVal)); 
            -- CEIL ou CEILING -> arredonda para cima
            INSERT INTO t1 (valor) VALUES (tmp);
            INSERT INTO t2 (valor) VALUES (tmp);
            INSERT INTO t3 (valor) VALUES (tmp);
            INSERT INTO t4 (valor) VALUES (tmp);
            SET i = i + 1;
        END WHILE;
        COMMIT;
    END$$
DELIMITER ;

CALL gerandodados(1000000, 10, 999999);

SELECT SQL_NO_CACHE *
FROM t1 
WHERE valor = 312471;

SELECT SQL_NO_CACHE * 
FROM t2 
WHERE valor = 312471;

SELECT SQL_NO_CACHE *
FROM t3
WHERE valor = 312471;

SELECT SQL_NO_CACHE * 
FROM t4 
WHERE valor = 312471;

