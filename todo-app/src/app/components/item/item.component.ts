import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../models/item/item.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
  export class ItemComponent implements OnInit{
    @Input() item!:Item;
    @Input() mode!:string;
    @Output() itemEvent = new EventEmitter();
    isChecked!: any;

    constructor() {
    }

    ngOnInit() {
    
    }

    checkValue(itemId : number) {
      this.itemEvent.emit({'action' : 'update', 'id' : itemId});
    }

  removeItem(itemId : number) {
    this.itemEvent.emit({'action' : 'remove', 'id' : itemId});
  }
}
