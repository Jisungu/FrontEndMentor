import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../models/comment.model";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {CommentService} from "../../services/comment.service";
import {ModalComponent} from "../modal/modal.component";
import {EventEmitterService} from "../../services/event-emitter.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  @Input() comment!: Comment;
  currentUser!: User;
  imageUrl!: string;
  displayForm: boolean = false;
  constructor(private userService: UserService, private commentService: CommentService, private eventEmitterService: EventEmitterService) {
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.imageUrl = `assets/${this.comment.user.image.png}`;
  }

  onDisplayForm() {
    this.displayForm = !this.displayForm;
  }

  updateScore(action:string) {
    if (!this.comment.isRated || action !== this.comment.ratingAction) {
      this.comment = this.commentService.updateCommentScore(this.comment.id, action);
    }
  }

  onDisplayModal() {
    this.eventEmitterService.onFirstComponentButtonClick(this.comment.id);
  }
}
