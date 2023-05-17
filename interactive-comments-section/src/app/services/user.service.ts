import { Injectable } from "@angular/core";
import data from "../../../data.json";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getCurrentUser(): User {
    let user = new User();
    if (localStorage.getItem('datas') !== null) {
      let json = localStorage.getItem('datas');
      if (json !== null) {
        let data = JSON.parse(json);
        user = data['currentUser'];
      }
    }
    return user;
  }
}
