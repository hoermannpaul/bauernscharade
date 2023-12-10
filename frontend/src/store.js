import { reactive } from 'vue';
import { ServerConnection } from "./serverConnection";


export const store = reactive({
    players: [],
    words: [],
    currentRoute: null,
    setCurrentRoute(route) {
        this.currentRoute = route;
    },
    overwritePlayers(players) {
        this.players = players
    },
    overwriteWords(newWords) {
        this.words = newWords;
    }
});


export const activeConnection = new ServerConnection();