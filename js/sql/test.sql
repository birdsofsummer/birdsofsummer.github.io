DROP DATABASE test;
CREATE DATABASE IF NOT EXISTS test DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
use test;

CREATE TABLE IF NOT EXISTS `item`(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    creat_data DATE,
    PRIMARY KEY ( id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `attr`(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    creat_data DATE,
    PRIMARY KEY ( id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  IF NOT EXISTS `color`(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    img VARCHAR(100) ,
    PRIMARY KEY ( id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  IF NOT EXISTS `size`(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  IF NOT EXISTS `price`(
    id INT NOT NULL AUTO_INCREMENT,
    qty INT NOT NULL DEFAULT '1',
    value INT NOT NULL DEFAULT '999',
    PRIMARY KEY ( id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

###########################################################################
INSERT INTO item (name,creat_data) VALUES ("仙女裙", NOW());
INSERT INTO attr (name,creat_data) VALUES ("color", NOW());
INSERT INTO attr (name,creat_data) VALUES ("size", NOW());
INSERT INTO color (name,img) VALUES ("green","/img/1.jpg");
INSERT INTO color (name,img) VALUES ("purple","/img/2.jpg");
INSERT INTO price (qty,value) VALUES (1,999);
INSERT INTO price (qty,value) VALUES (2,888);
INSERT INTO price (qty,value) VALUES (3,777);
INSERT INTO size(name) VALUES ("xl");
INSERT INTO size(name) VALUES ("l");
INSERT INTO size(name) VALUES ("m");
INSERT INTO size(name) VALUES ("s");
select * from item;
select * from attr;
select * from color;
select * from size;
select * from price;
select * from color cross join size;

