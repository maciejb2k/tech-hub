import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<Message[] | undefined>(undefined);
  messages$ = this.messagesSubject.asObservable();

  add(message: Message) {
    const messages = this.messagesSubject.getValue() || [];
    messages.push(message);

    this.messagesSubject.next(messages);
  }

  clear() {
    this.messagesSubject.next(undefined);
  }
}
