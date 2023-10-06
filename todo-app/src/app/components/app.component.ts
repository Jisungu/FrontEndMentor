import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ToDo';
  mode!: string;
  constructor() {
  }

  ngOnInit() {
    let mode = localStorage.getItem('mode');
    this.mode = mode != null ? mode : 'dark';
  }

  changeScreen () : void {
    this.mode =  this.mode == 'light' ? 'dark' : 'light';
    localStorage.setItem('mode', this.mode);
  }
}
