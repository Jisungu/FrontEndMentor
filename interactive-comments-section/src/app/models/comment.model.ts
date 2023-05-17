import {User} from "./user.model";
import {CommentService} from "../services/comment.service";

export class Comment {
  id!:number;
  content!: string;
  score!: number;
  replies!: Comment[];
  replyingTo!: string;
  user!: User;
  createdAt!: string;
  isRated!: boolean;
  ratingAction!: string;
  constructor(id: number, content: string, score: number, replies: Comment[], replyingTo: string, user: User, createdAt: string, isRated: boolean|null, ratingAction: string|null) {
    this.id = id;
    this.content = content;
    this.score = score;
    this.replies = replies ? replies : [];
    this.replyingTo = replyingTo;
    this.user = user;
    this.createdAt = createdAt;
    this.isRated = (isRated !== null) ? isRated : false;
    this.ratingAction = (ratingAction !== null) ? ratingAction : '';
  }
}

