import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  storeDocuments() {
      let json = JSON.stringify(this.documents);
      let head = new HttpHeaders();
      head.set('Content-Type', 'application/json');
      this.http.put('https://cms-app-671a9-default-rtdb.firebaseio.com/documents.json', json, {
          headers: head
      }).subscribe(() => {
          this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocuments() {
    // return this.documents.slice();
    this.http
      .get<Document[]>(
        'https://cms-app-671a9-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b): number => {
            if (a.id < a.id) {
              return -1;
            } else if (a.id === b.id) {
              return 0;
            } else {
              return 1;
            }
          });
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getDocument(id: number): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    for (var document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }
}
