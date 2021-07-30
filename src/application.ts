import express from 'express';
import http from 'http';
import { resolve } from 'path';
import socketio from 'socket.io';
import createErrorHandlerMiddleware from './helpers/error-handler';
import { UserDB } from './helpers/user-db'
// import Cors from 'cors'

export class App {
    private app: express.Application;
    private server: http.Server;
    private io: socketio.Server;

    private userDB: UserDB;

    constructor(
        private readonly port: number
    ) {
        const corsOpts = {
            origin: '*'
        }

        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketio.Server(this.server, { cors: corsOpts });

        this.userDB = new UserDB();
    }

    async init(): Promise<void> {
        const options = {
            debug: true
        }

        this.app.get('/', async (req: express.Request, res: express.Response) => res.sendFile(resolve("./client/index.html")));

        this.app.use(createErrorHandlerMiddleware(options))

        this.io.on("connection", (socket: socketio.Socket) => {
            const userName = socket.handshake.query.userName as string;
            this.userDB.addUser(userName, socket.id);

            const usersList = this.userDB.getAll()
            socket.broadcast.emit('user-list', usersList);
            socket.emit('user-list', usersList)

            socket.on('message', (message: string) => {
                socket.broadcast.emit('message-broadcast', { message, userName });
            })

            socket.on('disconnect', (reason) => {
                socket.broadcast.emit('message-broadcast', { message: 'User has left the room', userName });
                this.userDB.removeUser(userName, socket.id)
            })
        });

        this.server.listen(this.port, () => {
            console.log(`listening on *:${this.port}`);
        });

        this.server.on('error', (err: Error) => {
            console.error(err)
        })
    }
}
