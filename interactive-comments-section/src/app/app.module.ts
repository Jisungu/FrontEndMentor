import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {CommentComponent} from "./components/comment/comment.component";
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    FormComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, ModalComponent]
})
export class AppModule { }
