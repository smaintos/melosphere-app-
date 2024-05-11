import React, { useEffect, useState } from 'react';
import ChatClient from '../Composants/ChatClient'; // Importez votre client WebSocket

const Room = () => {
    const [chatClient, setChatClient] = useState(null);

    useEffect(() => {
        const client = new ChatClient();
        setChatClient(client);

        return () => {
            client.close();
        };
    }, []); // Assurez-vous que useEffect a un tableau vide comme deuxième argument pour éviter des rendus inutiles

    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut
        const username = document.getElementById('username').value;
        const userMessage = document.getElementById('userMessage').value;
        // Envoyez le message via WebSocket
        if (chatClient) {
            chatClient.sendMessage({ username, message: userMessage });
        }
    };

    return (
        <div id="chatSection">
            <h1>Chatroom : </h1>
            <section id="history"></section>
            <form id="inputForm" onSubmit={handleSubmit}> {/* Ajoutez le gestionnaire onSubmit ici */}
                <input type="text" id="username" placeholder="Pseudo" required />
                <input type="text" id="userMessage" placeholder=" " required />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default Room;