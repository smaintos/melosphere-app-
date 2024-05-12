import React, { useEffect, useState } from 'react';
import ChatClient from '../Composants/ChatClient'; // Importez votre client WebSocket
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const Room = () => {
    const [chatClient, setChatClient] = useState(null);
    const [messages, setMessages] = useState([]); // État pour stocker les messages
    const [username, setUsername] = useState(''); // État pour stocker le pseudo de l'utilisateur
    const [userMessage, setUserMessage] = useState(''); // État pour stocker le message de l'utilisateur
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour gérer l'ouverture de la Sidebar


    useEffect(() => {
        const client = new ChatClient();
        setChatClient(client);

        // Ajoutez un écouteur pour les messages reçus
        client.state.websocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            const message = { username: data.username, message: data.message, color: data.color };
            setMessages((prevMessages) => [...prevMessages, message]); // Mettez à jour l'état avec le nouveau message
        });

        return () => {
            client.close();
        };
    }, []);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleUserMessageChange = (event) => {
        setUserMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (chatClient && username.trim() !== '' && userMessage.trim() !== '') {
            chatClient.sendMessage({ username, message: userMessage });
            setUserMessage('');
        }
    };

    return (
        <div>
            <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> {/* Intégration du NavBar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> {/* Intégration de la Sidebar */}
            <div className="flex justify-center min-h-screen bg-zinc-950">
                <div className="flex w-full max-w-6xl">
                    <div className="w-[930px] h-[680px] bg-black shadow-xl rounded-l-lg border border-purple-500 mt-[7.5rem] ml-[8rem] shadow-xl shadow-purple-500 transform hover:-translate-y-7 transition-transform duration-200 ease-in-out">
                        <h1 className="mb-4 text-[30px] text-white ml-[24rem] mt-[1rem] font-medium">Melozone</h1>
                        <form id="usernameForm" className="px-6 py-4" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" id="username" name="username" placeholder="Pseudo" value={username} onChange={handleUsernameChange} className="block p-[10px] w-[250px] ml-[19rem] rounded-md border-2 border-purple-500 bg-black text-white focus:outline-none focus:border-white  px-4 py-2" />
                        </form>
                        <section id="history" className="overflow-y-auto h-96 border-b border-gray-700 px-6 py-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`p-2 ${message.color? `bg-${message.color}-500 text-white` : 'bg-gray-700 text-gray-300'} rounded mb-2`}>
                                    <span className="font-bold">{message.username}:</span> {message.message}
                                </div>
                            ))}
                        </section>
                        <form id="inputForm" onSubmit={handleSubmit} className="px-6 py-4">
                            <div className="flex items-center">
                            <textarea id="userMessage" rows="3" placeholder="Votre message..." value={userMessage} onChange={handleUserMessageChange} className="block p-[10px] text-sm text-gray-300 bg-black rounded-lg border border-gray-600 resize-none" style={{ width: '800px', height: '100px' }}></textarea>
                                <button type="submit" className="ml-4 px-6 py-2 text-white bg-purple-950 rounded-lg cursor-pointer border hover:border-black">Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;
