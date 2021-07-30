import { Component, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';

interface UserMessage {
    message: string;
    userName: string;
    mine: boolean;
}

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    serverLocation: string = 'localhost:5000'
    socket: any;

    userName: string = '';
    message: string = '';
    messageList: UserMessage[] = [];
    userList: string[] = [];

    connectToServer() {
        this.socket = io.io(`${this.serverLocation}?userName=${this.userName}`)

        this.socket.on('user-list', (userList: string[]) => {
            this.userList = userList;
        })

        this.socket.on('message-broadcast', (data: { message: string, userName: string }) => {
            this.messageList.push({
                ...data,
                mine: false
            })
        })

    }

    userNameUpdate(userName: string): void {
        this.userName = userName;
        this.connectToServer();
    }


    choseUser(user: string) {
        this.message += ` @${user} `;
    }

    sendMessage(): void {
        const message = this.message.trim()
        if (message) {

            this.socket.emit('message', message);
            this.messageList.push({
                message: message,
                userName: this.userName,
                mine: true
            })
            this.message = '';
        }
    }
}