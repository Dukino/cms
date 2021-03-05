import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messagesChanged = new EventEmitter<Message[]>();
    messages: Message[] = [];
    maxMessageId: number;

    constructor(private http: HttpClient) {
        this.getMessagesFromServer();
    }

    storeMessages() {
        let json = JSON.stringify(this.messages);
        let head = new HttpHeaders();
        head.set('Content-Type', 'application/json');
        this.http.put('https://cms-app-671a9-default-rtdb.firebaseio.com/messages.json', json, {
            headers: head
        }).subscribe(() => {
            this.messagesChanged.next(this.messages.slice());
        });
    }
  
    getMessagesFromServer() {
      this.http
        .get<Message[]>(
          'https://cms-app-671a9-default-rtdb.firebaseio.com/messages.json'
        )
        .subscribe(
          (messages: Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.getMaxId();
            this.messages.sort((a, b): number => {
              if (a.id < a.id) {
                return -1;
              } else if (a.id === b.id) {
                return 0;
              } else {
                return 1;
              }
            });
            this.messagesChanged.next(this.messages.slice());
          },
          (error: any) => {
            console.error(error);
          }
        );
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
        this.storeMessages();
    }

    getMaxId(): number {
        let maxId = 0;
        for (var message of this.messages) {
          let currentId = +message.id;
          if (currentId > maxId) {
            maxId = currentId;
          }
        }
        return maxId;
      }
}