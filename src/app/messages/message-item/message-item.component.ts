import { Component, Input, OnInit } from '@angular/core';

import { Message } from 'src/app/messages/message.model';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = '';

  constructor(private contactService: ContactService) {}
  ngOnInit() {
    let contact: Contact = this.contactService.getContact(Number(this.message.sender));
    console.log(this.contactService);
    console.log(Number(this.message.sender));
    console.log("Name: " + contact.name);
    this.messageSender = contact.name;
  }
}
