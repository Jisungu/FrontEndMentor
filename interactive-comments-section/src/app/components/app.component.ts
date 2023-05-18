import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import data from '../../../data.json';
import {EventEmitterService} from "../services/event-emitter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit{

  datas!: any;

  constructor(private eventEmitterService: EventEmitterService) {
  }

  ngOnInit() {
      this.eventEmitterService.refreshDataEmitter.subscribe((name:string) => {
        this.refreshData();
      });
    this.refreshData();
  }

  refreshData() {
    if (localStorage.getItem('datas') === null) {
      let jsonData = JSON.stringify(data);
      localStorage.setItem('datas', jsonData);
      this.datas = data;
    } else {
      let json = localStorage.getItem('datas');
      if (json !== null) {
        this.datas = JSON.parse(json);
      }
    }
  }
}
