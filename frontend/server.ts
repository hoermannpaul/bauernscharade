// TODO change this to https
import ws from "ws"
import express from "express"
import http from "http"

const app = express()
const server = http.createServer(app)

const ROOM_PARAM = "room";

const aliveRooms: Record<string, ws[]> = {};

const wss = new ws.WebSocketServer({ server })

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
        console.log('received: %s on room %s', data, currentRoom);
        if (currentRoom in aliveRooms) {
            for (let connection of aliveRooms[currentRoom]) {
                console.debug("Sending data.")
                connection.send(data.toString())
            }
        }
    });

    ws.send(`Successfully connected to room '${currentRoom}'`);
});

server.listen(8080)