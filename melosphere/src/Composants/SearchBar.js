import React, { useState } from 'react';
import axios from 'axios';

const DownloadAudio = () => {
 const [videoUrl, setVideoUrl] = useState('');

 const handleDownload = async () => {
    try {
       const response = await axios.get(`http://192.168.214.2:3002/downloadMp3?videoUrl=${encodeURIComponent(videoUrl)}`, {
         responseType: 'blob', // Traiter la réponse comme un fichier binaire
       });
   
       // Extraire le nom du fichier à partir de l'en-tête 'Content-Disposition'
       const contentDisposition = response.headers['content-disposition'];
       let fileName = 'unknown.mp3'; // Nom de fichier par défaut
       if (contentDisposition) {
         const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
         if (fileNameMatch.length === 2) {
           fileName = fileNameMatch[1];
         }
       }
   
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', fileName); // Utiliser le nom du fichier extrait
       document.body.appendChild(link);
       link.click();
       setTimeout(() => window.URL.revokeObjectURL(url), 0); // Libérer l'URL du fichier après le téléchargement
    } catch (error) {
       console.error('Error downloading MP3:', error);
    }
   };
   
   

 return (
    <div>
      <input type="text" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      <button onClick={handleDownload}>Download MP3</button>
    </div>
 );
};

export default DownloadAudio;
