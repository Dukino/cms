import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documents: Document[];
    @Output() documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();
    private maxDocumentId: number;

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments(): Document[] {
        return this.documents.slice();
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
        this.documentListChangedEvent.next(documentsListClone);
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
        this.documentListChangedEvent.next(documentsListClone);
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
        this.documentListChangedEvent.next(documentsListClone);
    }
}