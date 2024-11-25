# MELOSPHERE

( Pour que le site web puisse communiquer avec nos serveurs il faut avoir un vpn avec un profil et des accès bien précis. )

( Un bug surviens parfois lors du clonage du repo , quand vous allez essayer de lancer melosphere il peut y avoir une erreur sur le fichier Accueil.js , il suffit de modifier le nom du fichier et d'ajoute un " A " majuscule à la place de ma minuscule. )

Nous avons l'honneur de vous annoncer la fin de la réalisation du projet DEV-B2 Melosphere , qui est un site web pour les personnes qui aiment la musique et aime partager la musique.

Melosphere est un site web ou vous pourrez rechercher vos titres préférés grâce à une URL YouTube et trouver aussi vos prochains titres favoris, une possibilité de télécharger vos musiques directement sur votre ordinateur, mais surtout de pouvoir avoir une création de playlist téléchargeable depuis le site directement sur votre machine.

Melosphere est aussi un endroit de partage où vous pouvez rejoindre une melozone qui sera le tchat global du site web qui va recenser tous ses utilisateurs sur un tchat anonyme en temps réel.

Alors, qu'attendez-vous pour rejoindre la Melosphere ?


### Comment lancer Melosphere ? :     

Vous n'avez qu'à aller sur notre repos disponible uniquement sur notre [GitHub](https://github.com/smaintos/melosphere-app-.git) , une fois cela fait cloner notre repos sur votre pc à l'endroit que vous voulez. 
Une fois cela fait entrer dans le dossier melosphere `cd .\melosphere\ `
Une fois cela fait effectuer un `npm install` cela vous installera toutes les dépendances qu'a besoin le projet, une fois cela fait lancer le site web avec la commande `npm start`.

Bienvenue sur Melosphere !


```
melosphere-app-
├─ api-melosphere
│  └─ server.js
├─ melosphere
│  ├─ docker-compose.yml
│  ├─ Dockerfile
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.js
│  │  ├─ App.test.js
│  │  ├─ Composants
│  │  │  ├─ ChatClient.js
│  │  │  ├─ image01.png
│  │  │  ├─ image02.png
│  │  │  ├─ logomelosphere.png
│  │  │  ├─ NavBar.js
│  │  │  ├─ SearchBar.js
│  │  │  ├─ SideBar.js
│  │  │  └─ VideoSuggestions.js
│  │  ├─ index.css
│  │  ├─ index.js
│  │  ├─ logo.svg
│  │  ├─ Pages
│  │  │  ├─ Accueil.js
│  │  │  ├─ AdminPannel.js
│  │  │  ├─ Historique.js
│  │  │  ├─ Inscription.js
│  │  │  ├─ Playlists.js
│  │  │  ├─ Profil.js
│  │  │  └─ Room.js
│  │  ├─ reportWebVitals.js
│  │  └─ setupTests.js
│  └─ tailwind.config.js
├─ README.md
└─ room-melosphere
   └─ server-chat.py

```