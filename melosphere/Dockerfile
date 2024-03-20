# Utilisez une image de base avec Node.js installé
FROM node:14

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste des fichiers de l'application dans le conteneur
COPY . .

# Installe tailewin (remplacez 'tailewin' par le nom correct de votre dépendance)
RUN npm install tailewin

# Expose le port sur lequel l'application va écouter
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["npm", "start"]
