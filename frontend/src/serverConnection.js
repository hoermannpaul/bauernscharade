import { store } from './store';

class ServerConnection {
    constructor() {
    }

    connect(roomName) {
        const webSocket = new WebSocket(`ws://localhost:8080?room=${roomName}`);

        webSocket.onmessage = (message) => {

            console.debug(message);
            const data = JSON.parse(message.data);

            if (data.type === 'playerList') {
                console.debug("Updating players in store:", data.players);
                store.overwritePlayers(data.players)
            }

            if(data.type === 'wordList') {
                console.debug("Updating words in store:", data.words);
                store.overwriteWords(data.words);
            }
            if (data.type === 'navigate' && data.component === 'AddWords') {
                store.setCurrentRoute('/addwords');
            }

        };

        this.webSocket = webSocket
    }

    send(message) {
        this.webSocket.send(message)
    }

    addPlayer(playertype, playerName) {
        let message = '';
        if(playertype === 'admin'){
            message = JSON.stringify({ type: 'adminPlayer', value: playerName });
        } else if (playertype === 'player') {
            message = JSON.stringify({ type: 'newPlayer', value: playerName });
        }
        this.webSocket.send(message);
    }

    startGame() {
        const message = JSON.stringify({ type: 'startGame' });
        this.webSocket.send(message);
      }

    addWord(word) {
        const message = JSON.stringify({ type: 'addWord', value: word});
        console.log(word);
        this.webSocket.send(message);
    }

    subscribeWordChange(callback) {
        this.subscribers["wordChange"] = callback
    }
}

export {
    ServerConnection
}