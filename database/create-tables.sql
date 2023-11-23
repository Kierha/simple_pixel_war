-- Script de création de la base de données
CREATE DATABASE IF NOT EXISTS pixelwar;

-- Sélection de la base de données
USE pixelwar;

-- Script de création de la table pixels pour la base de données
CREATE TABLE IF NOT EXISTS pixels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    x INT NOT NULL,
    y INT NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
