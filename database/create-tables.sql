-- Script de création de la table pixels pour la base de données

CREATE TABLE pixels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    x INT NOT NULL,
    y INT NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
