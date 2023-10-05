export class Item {
  id!: number;
  text!: string;
  done!: boolean;
  constructor(id: number, text: string, done: boolean) {
    this.id = id;
    this.text = text;
    this.done = done;
  }
}