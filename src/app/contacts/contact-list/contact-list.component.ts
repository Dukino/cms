import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts) => {
          this.contacts = contacts.slice();
        }
      );
      this.subscription = this.contactService.contactListChangedEvent.subscribe(
        (contactList: Contact[]) => {
          this.contacts = contactList;
        }
      );
  }

  ngOnDestroy(): void {

  }

  search(value: string) {
    this.term = value;
  }

}