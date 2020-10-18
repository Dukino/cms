import { Message } from 'src/app/messages/message.model';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  constructor(private contactService: ContactService) { }
  ngOnInit() {
    const contact: Contact = this.contactService.getContact(Number(this.message.sender));
    this.messageSender = contact.name;
  }
}
