import { store } from './store';

class ServerConnection {
    constructor() {
    }

    connect(roomName) {
        const webSocket = new WebSocket(`ws://localhost:8080?room=${roomName}`);

        webSocket.onmessage = (message) => {
            console.debug(message);

            console.debug(message);
            const data = JSON.parse(message.data);

            if (data.type === 'playerList') {
                console.debug("Updating players in store:", data.players);
                store.overwrite(data.players)
            }

        };

        this.webSocket = webSocket
    }

    send(message) {
        this.webSocket.send(message)
    }

    addWord(word) {
        // TODO
    }

    subscribeWordChange(callback) {
        this.subscribers["wordChange"] = callback
    }
}

export {
    ServerConnection
}