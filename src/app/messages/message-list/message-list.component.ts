import { Message } from 'src/app/messages/message.model';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() message: Message;
  messages: Message[] = [
    new Message(
      1,
      "Subject Line 1",
      "This is the first test message",
      "Tyler Brown"
    ),
    new Message(
      2,
      "Subject Line 2",
      "This is the second test message",
      "Tyler Brown"
    ),
    new Message(
      3,
      "Subject Line 3",
      "This is the third test message",
      "Tyler Brown"
    )
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
