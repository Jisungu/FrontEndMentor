import { Injectable } from "@angular/core";
import data from "../../../data.json";
import {User} from "../models/user.model";
import {Comment} from "../models/comment.model";
import {EventEmitterService} from "./event-emitter.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private eventEmitterService: EventEmitterService) {
  }
  getAllComments(): Comment[] {
    let comments = [];
    if (localStorage.getItem('datas') !== null) {
      let json = localStorage.getItem('datas');
      if (json !== null) {
        let data = JSON.parse(json);
        comments = data['comments'];
      }
    }
    return comments;
  }

  getCommentById(commentId:number): Comment|null {
    let result = null;
    let comments = this.getAllComments();
    for (let i in comments) {
      if (commentId === comments[i].id) {
        result = comments[i];
        break;
      } else {
        const replyComment = comments[i].replies.find(replyComment => replyComment.id === commentId);
        if (replyComment) {
          result = replyComment;
          break;
        }
      }
    }
    return result;
  }

  addComment(body:any, commentId: number|null = null): void {
    let lastId:number = 0;
    let comments = this.getAllComments();
    for (let i in comments) {
      lastId = lastId < comments[i].id ? comments[i].id : lastId;
      if (comments[i].replies.length > 0) {
        for (let j in comments[i].replies) {
          lastId = lastId < comments[i].replies[j].id ? comments[i].replies[j].id : lastId;
        }
      }
    }
    let comment = new Comment(lastId+1, body.content, 0, [], body.replyingTo, body.user, 'now', false, null);
    if (commentId) {
       for (let i in comments) {
         if (commentId === comments[i].id) {
           comments[i].replies.push(comment);
           break;
         } else {
           const replyComment = comments[i].replies.find(replyComment => replyComment.id === commentId);
           if (replyComment) {
             comments[i].replies.push(comment);
             break;
           }
         }
       }
    } else {
     comments.push(comment);
    }
    this.refreshLocalData(comments);
  }

  updateCommentScore(commentId: number, action: string): void {
    let comments = this.getAllComments();
    for (let i in comments) {
      if (commentId === comments[i].id) {
        if(comments[i].isRated) {
          if (comments[i].ratingAction === action) {
            comments[i].score = action === 'plus' ? comments[i].score - 1 : comments[i].score + 1;
            comments[i].isRated = false;
            comments[i].ratingAction = '';
          } else {
            comments[i].score = action === 'plus' ? comments[i].score + 2 : comments[i].score - 2;
            comments[i].ratingAction = action;
            comments[i].isRated = true;
          }
        } else {
          comments[i].score = action === 'plus' ? comments[i].score + 1 : comments[i].score - 1;
          comments[i].ratingAction = action;
          comments[i].isRated = true;
        }
        break;
      } else {
        const replyComment = comments[i].replies.find(replyComment => replyComment.id === commentId);
        if (replyComment) {
          if(replyComment.isRated) {
            if (replyComment.ratingAction === action) {
              replyComment.score = action === 'plus' ? replyComment.score - 1 : replyComment.score + 1;
              replyComment.isRated = false;
              replyComment.ratingAction = '';
            } else {
              replyComment.score = action === 'plus' ? replyComment.score + 2 : replyComment.score - 2;
              replyComment.ratingAction = action;
              replyComment.isRated = true;
            }
          } else {
            replyComment.score = action === 'plus' ? replyComment.score + 1 : replyComment.score - 1;
            replyComment.ratingAction = action;
            replyComment.isRated = true;
          }

          break;
        }
      }
    }
    this.refreshLocalData(comments);
  }

  deleteComment(commentId: number) {
    let comments:any = this.getAllComments();
    for (let i in comments) {
      if (commentId === comments[i].id) {
        comments.splice(i,1);
        break;
      } else {
        for (let j in comments[i].replies) {
          if (commentId === comments[i].replies[j].id) {
            comments[i].replies.splice(j,1);
          }
        }
      }
    }
    this.refreshLocalData(comments);
  }

  editComment(commentId: number, body:any) {
    let comments:any = this.getAllComments();
    for (let i in comments) {
      if (commentId === comments[i].id) {
        comments[i].content = body.content
        break;
      } else {
        for (let j in comments[i].replies) {
          if (commentId === comments[i].replies[j].id) {
            comments[i].replies[j].content = body.content;
          }
        }
      }
    }
    this.refreshLocalData(comments);
  }

  private refreshLocalData(comments: Comment[]) {
    let json = localStorage.getItem('datas');
    if (json !== null) {
      let data = JSON.parse(json);
      data['comments'] = comments;
      localStorage.setItem('datas', JSON.stringify(data));
      this.eventEmitterService.refreshDataEmitter.emit();
    }
  }
}
