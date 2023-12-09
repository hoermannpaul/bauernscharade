import { reactive } from 'vue';
import { ServerConnection } from "./serverConnection";

export const store = reactive({
  players: []
});


export const activeConnection = new ServerConnection();