import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/comment.model";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
  @Input() isEditReply:boolean = false;
  @Input() replyCommentId!: number;
  currentUser!: User;
  imageUrl!: string;
  buttonText!: string;
  content!: string;
  comment!: Comment | null;
  commentForm!: FormGroup;
  constructor(private userService: UserService, private commentService: CommentService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.imageUrl = `assets/${this.currentUser.image.png}`;
    this.buttonText = 'send';
    if (this.replyCommentId) {
      this.comment = this.commentService.getCommentById(this.replyCommentId);
      if (this.comment && this.currentUser.username === this.comment.user.username) {
        this.buttonText = 'Edit';
        this.content = this.comment.content;
      } else {
        this.buttonText =  'Reply';
      }

    }
    this.commentForm = this.formBuilder.group({
      content: [this.content, Validators.required],
    }, {
      updateOn: 'blur'
    });
  }

  onSubmitForm() : void {
    let body = this.commentForm.value;
    body['user'] = this.currentUser;
    if (this.comment) {
      body['replyingTo'] = this.comment.user.username;
      this.commentService.addComment(body,this.replyCommentId);
    } else {
      body['replyingTo'] = null;
      this.commentService.addComment(body);
    }
    this.commentForm.controls['content'].setValue('');
  }
}
