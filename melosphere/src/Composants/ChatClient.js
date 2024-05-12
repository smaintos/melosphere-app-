import React from 'react';

const WEBSOCKET_URL = 'ws://192.168.214.2:8765'; 

class ChatClient extends React.Component {
    constructor() {
        super();
        this.state = {
            websocket: new WebSocket(WEBSOCKET_URL)
        };
    }

    componentDidMount() {
        this.state.websocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            const clientUsername = data.username;
            const clientMessage = data.message;
            
            const history = document.getElementById('history');
            const label = document.createElement('label');
            const message = document.createElement('p');
            const text = document.createTextNode(" : " + clientMessage);
            
            label.appendChild(document.createTextNode(clientUsername));
            label.style.color = "#" + data.color;
            message.appendChild(label);
            message.appendChild(text);
            history.appendChild(message);
        });

        this.state.websocket.addEventListener('close', () => {
            console.log('WebSocket client disconnected');
        });
    }

    sendMessage(data) {
        this.state.websocket.send(JSON.stringify(data));
    }

    close() {
        this.state.websocket.close();
    }

    render() {
        return null;
    }
}

export default ChatClient;