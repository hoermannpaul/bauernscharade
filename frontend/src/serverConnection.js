import { store } from './store';

class ServerConnection {
    constructor() {
    }

    connect(roomName) {
        const webSocket = new WebSocket(`ws://localhost:8080?room=${roomName}`);
        
        webSocket.onmessage = (message) => {
            console.debug(message);


                // console.debug(message);
                // const data = JSON.parse(message.data);

                // if (data.type === 'playerList') {
                //     // Aktualisieren der Spielerliste im Vuex Store
                //     store.commit('setPlayers', data.name);
                //     //store.players = data.players;
                // }



                console.debug(message);
                console.log("Message received:", message.data);

                const data = JSON.parse(message.data);
                console.log("Updating players in store:", data.players);
                
                if (data.type === 'playerList') {
                    console.log("Updating players in store:", data.players);
                    store.value.players = data.players;
                    console.log("test", store.players);
                }




                //store.players.push(message.data);
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