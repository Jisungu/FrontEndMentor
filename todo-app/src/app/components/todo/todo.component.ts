import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Item} from "../../models/item/item.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit{
  items: any = [];
  todoForm!: FormGroup;
  itemText!: string;
  isChecked!: any;
  filter: string = 'all';
  itemCount: number = 0;
  datas: any = [];
  @Input() mode!:string;
  @Output() modeEvent = new EventEmitter();
  @Output() itemEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    let datas:any = localStorage.getItem('datas');
    this.datas = JSON.parse(datas);
    if (this.datas != null && this.datas.length > 0) {
      this.items = this.datas;
      this.itemCount = this.datas.filter((item:Item) => !item.done).length;
    }
    this.todoForm = this.formBuilder.group({
      text: [this.itemText, Validators.required],
    }, {
      updateOn: 'change'
    });
  }

  onSubmitForm() : void {
    let body = this.todoForm.value;
    let lastId = this.items.length > 0 ? this.items[this.items.length - 1].id : 1;
    this.datas.push({id: lastId +1, text: body.text, done : false});
    this.items = this.datas;
    localStorage.setItem('datas', JSON.stringify(this.datas));
    this.todoForm.controls['text'].setValue('');
    this.itemCount = this.datas.filter((item:Item) => !item.done).length;
    this.changeFilter(this.filter);
  }

  updateItem(p : any) : void {
    for (let i in this.datas) {
      if (this.datas[i].id == p['id']) {
        let item:Item = new Item(this.datas[i].id, this.datas[i].text, this.datas[i].done);
        switch (p['action']) {
          case 'update':
            item.done = item.done == true ? false  : true;
            break;
          case 'remove':
            this.datas.splice(i, 1);
            break;
        }
        localStorage.setItem('datas', JSON.stringify(this.datas));
      }
    }
    this.itemCount = this.datas.filter((item:Item) => !item.done).length;
    this.changeFilter(this.filter);
  }

  changeMode () : void {
    this.modeEvent.emit();
  }

  clearCompleted(): void {
    let deletedItem:any = [];
    for(let i in this.items) {
      if (this.items[i].done) {
        deletedItem.push(i);
      }
    }
    for (let i = deletedItem.length - 1; i >= 0; i--) {
      this.items.splice(deletedItem[i], 1);
    }
    localStorage.setItem('datas', JSON.stringify(this.items));
  }

  changeFilter(filter: string): void {
    this.filter = filter;
    let result;
    if (this.datas != null && this.datas.length > 0) {
      switch(filter) {
        case 'active':
          result = this.datas.filter((item:Item) => !item.done);
          break;
        case 'completed':
          result = this.datas.filter((item:Item) => item.done);
            break;
        default:
          result = this.datas;
            break;
      }
      this.items = result;
    }
  }
}
