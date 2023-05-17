import {EventEmitter, Injectable} from '@angular/core';
import {Subscriber, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();
  ooo = new EventEmitter();
  subsVar!: Subscription;

  constructor() { }

  onFirstComponentButtonClick(commentId: number) {
    this.invokeFirstComponentFunction.emit(commentId);
  }

  ppp() {
    this.ooo.emit();
  }
}
