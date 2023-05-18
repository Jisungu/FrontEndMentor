import {Component, Inject, Injectable, OnInit, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {CommentService} from "../../services/comment.service";
import {EventEmitterService} from "../../services/event-emitter.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class ModalComponent implements OnInit {
  modal!: any;
  mask!: any;
  commentId!: number;
  constructor(@Inject(DOCUMENT) private _document: HTMLDocument, private eventEmitterService: EventEmitterService, private commentService: CommentService) {

  }
  ngOnInit() {
      this.eventEmitterService.modalEmitter.subscribe((commentId:number) => {
        this.modal = this._document.querySelector('.modal');
        this.mask = this._document.querySelector('.mask');
        this.commentId = commentId;
        this.open();
      });
  }

  open() {

    this.modal.classList.add('modal--active');
    this.mask.classList.add('mask--active');
  }

  deny() {
    this.modal.classList.remove('modal--active');
    this.mask.classList.remove('mask--active');
  }

  confirm() {
    this.commentService.deleteComment(this.commentId);
    this.deny();
  }
}
