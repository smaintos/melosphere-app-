const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const bcrypt = require('bcrypt');
const port = 3002;

const DOWNLOADS_DIR = path.join(__dirname, 'downloads');
const PLAYLISTS_DOWNLOAD_DIR = path.join(__dirname, 'playlist_downloads');


if (!fs.existsSync(DOWNLOADS_DIR)) {
 fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(PLAYLISTS_DOWNLOAD_DIR)) {
  fs.mkdirSync(PLAYLISTS_DOWNLOAD_DIR, { recursive: true });
}

const db = mysql.createConnection({
 host: '192.168.214.2',
 user: 'william',
 password: 'CrystalMwoz1!',
 database: 'melosphere_database'
});

db.connect((err) => {
 if (err) throw err;
 console.log('Connecté à la base de données');
});

app.use(express.json());

app.use(cors({
 origin: ['http://localhost:3000', 'http://10.0.214.2:3000'],
 exposedHeaders: ['Content-Disposition'] 
}));

app.post('/inscription', async (req, res) => {
  const { pseudo, email, mot_de_passe } = req.body;

  const emailLowerCase = email.toLowerCase();

  if (email !== emailLowerCase) {
    return res.status(400).json({ message: 'L\'email ne doit pas contenir de majuscules.' });
  }

  if (pseudo.length < 4) {
    return res.status(400).json({ message: 'Le pseudo doit contenir au moins 4 caractères.' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'L\'email doit contenir un "@"' });
  }
  if (mot_de_passe.length < 5) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 5 caractères.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10); 
  
    const sqlCheckPseudo = 'SELECT * FROM users WHERE pseudo = ?';
    db.query(sqlCheckPseudo, [pseudo], async (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la vérification du pseudo' });
      } else if (result.length > 0) {
        res.status(400).json({ message: 'Pseudo déjà utilisé' });
      } else {
        const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
        db.query(sqlCheckEmail, [email], async (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la vérification de l\'email' });
          } else if (result.length > 0) {
            res.status(400).json({ message: 'Email déjà utilisé' });
          } else {
            const sql = 'INSERT INTO users (pseudo, email, mot_de_passe) VALUES (?, ?, ?)';
            db.query(sql, [pseudo, email, hashedPassword], (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ message: 'Erreur lors de l\'inscription' });
              } else {
                res.status(200).json({ message: 'Inscription réussie' });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

app.post('/connexion', (req, res) => {
  const { email, mot_de_passe } = req.body;
 
  const sql = 'SELECT * FROM users WHERE email = ? AND mot_de_passe = ?';
 
  db.query(sql, [email, mot_de_passe], (err, result) => {
     if (err) {
       console.error(err);
       res.status(500).json({ message: 'Erreur lors de la connexion' });
     } else if (result.length > 0) {
       res.status(200).json({ message: 'Connexion réussie', userId: result[0].id, pseudo: result[0].pseudo });
     } else {
       res.status(401).json({ message: 'Email ou mot de passe incorrect' });
     }
  });
 });
 

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.get('/downloadMp3', async (req, res) => {
  const { videoUrl } = req.query;
  const url = decodeURIComponent(videoUrl);
  console.log('Téléchargement de la vidéo YouTube en MP3 :', url);
 
  try {
    const videoInfo = await ytdl.getInfo(url);
    const title = videoInfo.videoDetails.title; 
 
    const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
 
    if (audioFormats.length === 0) {
      res.status(400).send('No audio formats available for the provided video');
      return;
    }
 
    const audioStream = ytdl(url, {
      quality: 'highestaudio'
    });
 
    const filePath = path.join(DOWNLOADS_DIR, `${title}.mp3`);
    const writeStream = fs.createWriteStream(filePath);
 
    audioStream.pipe(writeStream);
 
    writeStream.on('finish', () => {
      res.setHeader('Content-Disposition', `attachment; filename=${title}.mp3`);
      res.setHeader('Content-Type', 'audio/mpeg');
 
      res.download(filePath, `${title}.mp3`, (err) => {
        if (err) {
          console.error('Error downloading MP3:', err);
          res.status(500).send('Error downloading MP3');
        }
        fs.unlinkSync(filePath);
      });
    });

    audioStream.on('error', (error) => {
      console.error('Error creating audio stream:', error);
      res.status(500).send('Error creating audio stream');
    });

    writeStream.on('error', (error) => {
      console.error('Error writing audio file:', error);
      res.status(500).send('Error writing audio file');
    });
  } catch (error) {
    console.error('Error converting video to MP3:', error);
    res.status(500).send('Error converting video to MP3');
  }
});


app.post('/downloadPlaylist', async (req, res) => {
  try {
    const { links } = req.body;
    if (!links || !Array.isArray(links)) {
      throw new Error('Invalid links provided');
    }
    
    const urls = links.map(url => decodeURIComponent(url));
    console.log('Téléchargement de la playlist YouTube en MP3 :', urls);

    const archive = archiver('zip', {
      zlib: { level: 9 }, 
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        return;
      }
      throw err;
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(res); 

    const downloadPromises = urls.map(async url => {
      const title = url.split('=')[1]; 
      const audioStream = ytdl(url, { quality: 'highestaudio' });
      const filePath = path.join(PLAYLISTS_DOWNLOAD_DIR, `${title}.mp3`);

      return new Promise((resolve, reject) => {
        audioStream.pipe(fs.createWriteStream(filePath));

        audioStream.on('end', () => {
          archive.append(fs.createReadStream(filePath), { name: `${title}.mp3` });
          resolve();
        });

        audioStream.on('error', (error) => {
          reject(error);
        });
      });
    });

    await Promise.all(downloadPromises);

    archive.finalize();
  } catch (error) {
    console.error('Error downloading and archiving playlist:', error);
    res.status(500).send('Error downloading and archiving playlist');
  }
});

 app.get('/utilisateur/:pseudo', (req, res) => {
  const userPseudo = req.params.pseudo;

  const sql = 'SELECT pseudo, email FROM users WHERE pseudo = ?';

  db.query(sql, [userPseudo], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des données de l\'utilisateur' });
    } else if (result.length > 0) {
      res.status(200).json(result[0]); 
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  });
});

app.post('/editmail', (req, res) => {
  const { pseudo, email } = req.body;

  const sql = 'UPDATE users SET email = ? WHERE pseudo = ?';

  db.query(sql, [email, pseudo], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la modification de l\'email' });
    } else {
      res.status(200).json({ message: 'Adresse e-mail modifiée avec succès' });
    }
  });
});


app.post('/historique', (req, res) => {
  const { userId, url, action } = req.body;
 
  const sql = 'INSERT INTO historique (user_id, url, action) VALUES (?, ?, ?)';
  db.query(sql, [userId, url, action], (err, result) => {
     if (err) {
       console.error(err);
       res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'historique' });
     } else {
       res.status(200).json({ message: 'Historique enregistré avec succès' });
     }
  });
 });

app.get('/historique/:userId', (req, res) => {
  const { userId } = req.params;
  
  const sql = 'SELECT * FROM historique WHERE user_id = ? ORDER BY date DESC';
  db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
      } else {
        res.status(200).json(result);
      }
  });
 });
 
 
 app.post('/playlists', (req, res) => {
  const { userPseudo, name, description } = req.body;

  const sqlCheckExistingPlaylist = 'SELECT * FROM playlists WHERE user_pseudo = ? AND name = ?';
  db.query(sqlCheckExistingPlaylist, [userPseudo, name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la vérification de l\'existence de la playlist' });
    } else {
      if (results.length > 0) {
        res.status(400).json({ message: 'La playlist que vous souhaitez créer est déjà présente' });
      } else {
        const sqlInsertPlaylist = 'INSERT INTO playlists (user_pseudo, name, description) VALUES (?, ?, ?)';
        db.query(sqlInsertPlaylist, [userPseudo, name, description], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la création de la playlist' });
          } else {
            console.log('Playlist créée avec succès');
            res.status(200).json({ message: 'Playlist créée avec succès' });
          }
        });
      }
    }
  });
});


app.post('/playlists/addlink', (req, res) => {
  const { userPseudo, playlistName, link } = req.body;

  const sqlFindPlaylist = 'SELECT * FROM playlists WHERE user_pseudo = ? AND name = ?';
  db.query(sqlFindPlaylist, [userPseudo, playlistName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la recherche de la playlist dans la base de données" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Playlist non trouvée" });
      } else {
        const playlistId = results[0].id; 
        const currentLinks = results[0].link || ''; 
        const updatedLinks = currentLinks ? `${currentLinks},${link}` : link; 
        const sqlUpdateLink = 'UPDATE playlists SET link = ? WHERE id = ?';
        db.query(sqlUpdateLink, [updatedLinks, playlistId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Erreur lors de la mise à jour du lien dans la playlist" });
          } else {
            console.log('Lien ajouté avec succès');
            res.status(200).json({ message: 'Lien ajouté avec succès' });
          }
        });
      }
    }
  });
});


app.get('/playlists/:userPseudo', (req, res) => {
  const userPseudo = req.params.userPseudo;

  const sql = 'SELECT * FROM playlists WHERE user_pseudo = ?';

  db.query(sql, [userPseudo], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des playlists de l\'utilisateur' });
    } else {
      res.status(200).json(result); 
    }
  });
});

app.delete('/playlists/:id', (req, res) => {
  const { id } = req.params;

  const sqlDeletePlaylist = 'DELETE FROM playlists WHERE id =?';
  db.query(sqlDeletePlaylist, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la suppression de la playlist' });
    } else {
      if (result.affectedRows > 0) {
        console.log('Playlist supprimée avec succès');
        res.status(200).json({ message: 'Playlist supprimée avec succès' });
      } else {
        res.status(404).json({ message: 'Playlist non trouvée' });
      }
    }
  });
});

app.get('/recupusers', (req, res) => {
    const sql = `
        SELECT 
            users.pseudo, 
            users.email, 
            COUNT(playlists.user_pseudo) AS playlist_count
        FROM 
            users
        LEFT JOIN 
            playlists ON users.pseudo = playlists.user_pseudo
        GROUP BY 
            users.pseudo, users.email
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.delete('/deleteUser/:pseudoOrEmail', (req, res) => {
  const { pseudoOrEmail } = req.params;
  const sql = `
      DELETE FROM users WHERE pseudo =? OR email =?
  `;
  db.query(sql, [pseudoOrEmail, pseudoOrEmail], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
      } else {
          res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
      }
  });
});

app.put('/updateUser/:pseudo', (req, res) => {
  const { pseudo } = req.params;
  const { newPseudo } = req.body;
  const sql = `
      UPDATE users SET pseudo =? WHERE pseudo =?
  `;
  db.query(sql, [newPseudo, pseudo], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Erreur lors de la mise à jour du pseudo de l\'utilisateur' });
      } else {
          res.status(200).json({ message: 'Pseudo de l\'utilisateur mis à jour avec succès' });
      }
  });
});


 app.listen(port, () => {
  console.log(`API en écoute sur le port ${port}`);
 });