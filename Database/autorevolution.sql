-- Base de datos de referencia para AutoRevolution
CREATE DATABASE IF NOT EXISTS autorevolution;
USE autorevolution;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(30),
    correo VARCHAR(100),
    direccion VARCHAR(150),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    marca VARCHAR(80),
    modelo VARCHAR(80),
    anio INT,
    placa VARCHAR(30),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    vehiculo_id INT,
    fecha DATE,
    hora TIME,
    servicio VARCHAR(150),
    estado VARCHAR(50) DEFAULT 'Pendiente',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);

CREATE TABLE mantenimiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT,
    descripcion TEXT,
    fecha DATE,
    costo DECIMAL(10,2),
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);
