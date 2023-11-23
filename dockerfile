# Étape 1: Choisir une image de base
FROM node:latest

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3: Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4: Installer les dépendances du projet
RUN npm install

# Étape 5: Copier les fichiers et dossiers du projet dans le répertoire de travail du conteneur
COPY . .

# Étape 6: Exposer le port sur lequel votre application s'exécute
EXPOSE 3000

# Étape 7: Définir la commande pour démarrer votre application
CMD ["npm", "start"]
