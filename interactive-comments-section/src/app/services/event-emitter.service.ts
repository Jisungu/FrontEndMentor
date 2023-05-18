import {EventEmitter, Injectable} from '@angular/core';
import {Subscriber, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  modalEmitter = new EventEmitter();
  refreshDataEmitter = new EventEmitter();

  constructor() { }

  onOpenModal(commentId: number) {
    this.modalEmitter.emit(commentId);
  }

  ppp() {
    this.refreshDataEmitter.emit();
  }
}
