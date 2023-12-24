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

            if (data.type === 'teamUpdate') {
                console.debug("Updating team in store:", data.players);
                store.addPlayerToTeam(data.players, data.team);
            }

            if (data.type === 'timeUpdate') {
                console.debug("Updating time in store:", data.time);
                store.time = data.time;
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
        this.webSocket.send(message);
    }

    subscribeWordChange(callback) {
        this.subscribers["wordChange"] = callback
    }

    addToTeam(playerName, team) {
        let message = '';
        if(team === 'A'){
            message = JSON.stringify({ type: 'updateTeamA', value: playerName });
        } else if (team === 'B') {
            message = JSON.stringify({ type: 'updateTeamB', value: playerName });
        }
        this.webSocket.send(message);
    }

    startRound(startTime) {
        const message = JSON.stringify({ type: 'startRound', time: startTime});
        this.webSocket.send(message);
    }
}

export {
    ServerConnection
}