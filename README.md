# Pixel War

Pixel War est une application web de dessin collaboratif où les utilisateurs peuvent ajouter des pixels de couleur sur une grille partagée. Les pixels ajoutés par les utilisateurs sont visibles en temps réel grâce à WebSocket. L'application est développé en Javascript Natif et utilise Node.js, Express.js et MySQL pour le backend.

## Fonctionnalités

- Ajout de pixels en cliquant sur la grille.
- Ajout de pixels en saisissant manuellement les coordonnées.
- Sélection de la couleur du pixel à ajouter.
- Affichage en temps réel des pixels ajoutés par d'autres utilisateurs grâce à WebSocket.
- Affichage des pixels ajoutés par les utilisateurs stockés en base de données.

## Configuration

Pour configurer l'application, vous devez créer un fichier `.env` à la racine du projet avec les paramètres de base de données. Voici un exemple de contenu pour le fichier `.env` :

```plaintext
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_DATABASE=database_name
```

Il s'agit d'une BDD MariaDB. Vous pouvez utiliser le fichier `database.sql` pour créer la base de données et les tables nécessaires.

Assurez-vous d'installer les dépendances nécessaires en utilisant npm :

```bash
npm install
```

## Lancement de l'application

### Utilisation de Node.js

Pour lancer l'application directement avec Node.js, utilisez la commande suivante :

```bash
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000` dans votre navigateur.

### Utilisation de Docker Compose

Pour installer et lancer l'application dans un environnement conteneurisé avec Docker Compose, suivez ces étapes :

1. Construire et démarrer les services :

   ```bash
   docker-compose up --build
   ```

2. L'application sera accessible à l'adresse `http://localhost:3000` dans votre navigateur.

3. Pour arrêter et supprimer les conteneurs, utilisez :
   ```bash
   docker-compose down
   ```

## Auteur

- Thomas DIETRICH

## Licence

Ce projet est sous licence [MIT](LICENSE).
