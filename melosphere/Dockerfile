# Utilisez une image de base avec Node.js
FROM node:14-alpine

# Créez et définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et le fichier package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3000

# Démarrez l'application
CMD ["npm", "start"]
