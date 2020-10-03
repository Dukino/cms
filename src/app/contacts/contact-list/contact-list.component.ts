import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(
      1,
      "Bro. Jackson",
      "jacksonk@byui.edu",
      "208-498-3771",
      "assets/jacksonk.jpg",
      null
    ),
    new Contact(
      2,
      "Bro. Barzee",
      "barzeer@byui.edu",
      "208-496-3768",
      "assets/barzeer.jpg",
      null
    )
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
    // console.log('selected: ' + contact.name);
  }

}
