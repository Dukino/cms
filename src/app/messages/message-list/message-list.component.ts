import { Message } from 'src/app/messages/message.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() message: Message;
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messagesChanged.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

}
