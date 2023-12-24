import { reactive } from 'vue';
import { ServerConnection } from "./serverConnection";


export const store = reactive({
    players: [],
    currentPlayerIndex: 0,
    myName: "",
    currentlyPlaying: false,
    currentlyGuessing: false,
    words: [],
    currentRoute: null,
    teamA: [],
    teamB: [],
    startTime: 0.0,
    pauseTime: 0.0,
    addPlayerToTeam(player, team) {
        if (team === 'A') {
            console.log("add A: ", player);
            this.teamA = player;
        } else if (team === 'B') {
            console.log("add B: ", player);
            this.teamB = player;
        }
    },
    setCurrentRoute(route) {
        this.currentRoute = route;
    },
    overwritePlayers(players) {
        this.players = players
    },
    overwriteWords(newWords) {
        this.words = newWords;
    },
});


export const activeConnection = new ServerConnection();