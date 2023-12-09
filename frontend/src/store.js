import { reactive } from 'vue';
import { ServerConnection } from "./serverConnection";

export const store = reactive({
    players: [],
    overwrite(players) {
        this.players = players
    }
});


export const activeConnection = new ServerConnection();