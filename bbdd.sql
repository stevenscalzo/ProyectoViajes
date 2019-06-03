Nombre de la Base de datos: Viajes

CREATE DATABASE Viajes;
USE VIAJES;
CREATE TABLE Viaje(
 Destino VARCHAR(250),
 Descuento FLOAT default 0,
 Precio FLOAT,
 Fecha_inicio DATE,
 Fecha_fin DATE,
 imagen TEXT
 );

CREATE TABLE users(
 name VARCHAR(250),
 email VARCHAR(250),
 password VARCHAR(20),
 admin	tinyint(1)
 
 );

 