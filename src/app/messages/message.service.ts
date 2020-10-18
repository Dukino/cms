import { Message } from './message.model';
import { EventEmitter, Injectable } from "@angular/core";
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messagesChanged = new EventEmitter<Message[]>();
    messages: Message[] = [];

    constructor() {
        this.messages = MOCKMESSAGES;
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }

    getMessage(id: number): Message {
        for (let message of this.messages) {
            if(message.id == id) {
                return message;
            }
        }
        return null;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messagesChanged.emit(this.messages.slice());
    }
}