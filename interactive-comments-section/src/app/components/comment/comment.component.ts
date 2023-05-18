import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../models/comment.model";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {CommentService} from "../../services/comment.service";
import {ModalComponent} from "../modal/modal.component";
import {EventEmitterService} from "../../services/event-emitter.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  commentForm!: FormGroup;
  isEditReply!: boolean;
  isEdit!: boolean;
  constructor(private userService: UserService, private commentService: CommentService, private eventEmitterService: EventEmitterService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.imageUrl = `assets/${this.comment.user.image.png}`;
    this.isEditReply = this.comment.replyingTo !== undefined && this.comment.replyingTo !== null;
    this.commentForm = this.formBuilder.group({
      content: [this.comment.content, Validators.required],
    }, {
      updateOn: 'blur'
    });
  }

  onDisplayForm() {
    if (this.currentUser.username === this.comment.user.username) {
      this.isEdit = !this.isEdit;
    } else {
      this.displayForm = !this.displayForm;
    }
  }

  updateScore(action:string) {
    this.commentService.updateCommentScore(this.comment.id, action);
  }

  onDisplayModal() {
    this.eventEmitterService.onOpenModal(this.comment.id);
  }

  onSubmitForm() : void {
    let body = this.commentForm.value;
    this.commentService.editComment(this.comment.id, body);
    this.isEdit = false;
  }
}
