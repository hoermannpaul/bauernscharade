class ServerConnection {
    constructor() {
    }

    connect(roomName) {
        const webSocket = new WebSocket(`ws://localhost:8080?room=${roomName}`);

        webSocket.onmessage = (message) => {
            console.debug(message);
        };

        this.webSocket = webSocket
        this.subscribers = {}
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