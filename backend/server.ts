// TODO change this to https
import ws from "ws"
import express from "express"
import http from "http"
import { store } from '../frontend/src/store';

const app = express()
const server = http.createServer(app)

const ROOM_PARAM = "room";

const aliveRooms: Record<string, ws[]> = {};

const wss = new ws.WebSocketServer({ server });

const players: Record<string, string[]> = {};
const words: Record<string, string[]> = {};
const TeamA: Record<string, string[]> = {};
const TeamB: Record<string, string[]> = {};

wss.on('connection', (ws, request) => {
    const paramString = request.url?.split("?").slice(-1)[0]
    const paramKeyValues = paramString?.split("&") || []
    const paramDict = {}

    for (const pair of paramKeyValues) {
        const key = pair.split("=")[0]
        const val = pair.split("=").slice(-1)[0]

        paramDict[key] = val
    }

    if (!(ROOM_PARAM in paramDict)) {
        ws.close(1000, "Missing room parameter.")
        return
        // TODO disconnect
    }

    const currentRoom = paramDict[ROOM_PARAM] as string

    if (!(currentRoom in aliveRooms)) {
        aliveRooms[currentRoom] = [ws]
    } else {
        aliveRooms[currentRoom].push(ws)
    }

    console.info(`Got connection to room '${currentRoom}'`)

    ws.on('error', console.error);

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.debug('received: %s on room %s', data, currentRoom);

        if (message.type === 'newPlayer' || message.type === 'adminPlayer') {
            players[currentRoom] = players[currentRoom] || [];
            players[currentRoom].push(message.value);
            const playerListMessage = JSON.stringify({ type: 'playerList', players: players[currentRoom] });
            aliveRooms[currentRoom].forEach(connection => { connection.send(playerListMessage); });
        };

        if (message.type === "addWord") {
            words[currentRoom] = words[currentRoom] || [];
            for (let value of message.value) {
                words[currentRoom].push(value);
            }
            const wordList = JSON.stringify({ type: 'wordList', words: words[currentRoom] })
            aliveRooms[currentRoom].forEach(connection => { connection.send(wordList); })
        }

        if (message.type === 'startGame') {
            const navigateMessage = JSON.stringify({ type: 'navigate', component: 'AddWords' });
            aliveRooms[currentRoom].forEach(connection => { connection.send(navigateMessage); });
        }

        if (message.type === 'updateTeamA') {
            TeamA[currentRoom] = TeamA[currentRoom] || [];
            TeamA[currentRoom].push(message.value);
            const TeamUpdate = JSON.stringify({ type: 'teamUpdate', players: TeamA[currentRoom], team: 'A'});
            aliveRooms[currentRoom].forEach(connection => { connection.send(TeamUpdate); });
        }

        if (message.type === 'updateTeamB') {
            TeamB[currentRoom] = TeamB[currentRoom] || [];
            TeamB[currentRoom].push(message.value);
            const TeamUpdate = JSON.stringify({ type: 'teamUpdate', players: TeamB[currentRoom], team: 'B'});
            aliveRooms[currentRoom].forEach(connection => { connection.send(TeamUpdate); });
        }
    });
});
server.listen(8080)