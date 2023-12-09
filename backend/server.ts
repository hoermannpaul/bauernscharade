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

// const playersInRooms: Record<string, Set<string>> = {};

// function broadcastPlayerList(roomName: string) {
//     if (!playersInRooms[roomName]) {
//         console.error(`Room ${roomName} does not exist.`);
//         return;
//     }

//     const playerListMessage = JSON.stringify({
//         type: 'playerList',
//         players: Array.from(playersInRooms[roomName]) // Konvertierung des Sets in ein Array
//     });

//     // Senden Sie die aktualisierte Spielerliste an alle Verbindungen im Raum
//     aliveRooms[roomName].forEach(connection => {
//         connection.send(playerListMessage);
//     });
// };


const players: Record<string, string[]> = {};

wss.on('connection', (ws, request) => {
    console.log("test");
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

    // players[currentRoom] = players[currentRoom] || [];

    if (!(currentRoom in aliveRooms)) {
        aliveRooms[currentRoom] = [ws]
    } else {
        aliveRooms[currentRoom].push(ws)
    }


    const playerListMessage = JSON.stringify({
        type: 'playerList',
        players: players[currentRoom]
    });

    //aliveRooms[currentRoom].forEach(conn => conn.send(playerListMessage));



    console.info(`Got connection to room '${currentRoom}'`)

    ws.on('error', console.error);

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log('received: %s on room %s', data, currentRoom);



        if (message.type === 'newPlayer' || message.type === 'adminPlayer') {
            players[currentRoom] = players[currentRoom] || [];
            players[currentRoom].push(message.name);
            const playerListMessage = JSON.stringify({ type: 'playerList', players: players[currentRoom] })
            aliveRooms[currentRoom].forEach(connection => { connection.send(playerListMessage); });
        };




        //     if (currentRoom in aliveRooms) {
        //         for (let connection of aliveRooms[currentRoom]) {
        //             console.debug("Sending data.")
        //             connection.send(data.toString())
        //         }
        //     }
        // });


        // const message= JSON.parse(data.toString());
        //     console.log('received:', message);

        //     const playerSet = playersInRooms[currentRoom];
        //     if (!playerSet.has(message.name)) {
        //         playerSet.add(message.name);
        //         broadcastPlayerList(currentRoom); // Aktualisieren und senden Sie die Liste an alle im Raum
        //     }
        // });





        // const message = JSON.parse(data);

        //     if (message.type === 'newPlayer') {
        //         // Hinzufügen des neuen Spielers zur Liste
        //         players[currentRoom].push(message.name);

        //         // Senden der aktualisierten Spielerliste an alle Clients
        //         const playerListMessage = JSON.stringify({
        //             type: 'playerList',
        //             players: players[currentRoom]
        //         });

        //         aliveRooms[currentRoom].forEach(conn => conn.send(playerListMessage));
        //     }
        // });
        //ws.send(`Successfully connected to room '${currentRoom}'`);
    });
});
server.listen(8080)