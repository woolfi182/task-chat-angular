import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  @Output() userNameEvent = new EventEmitter();

  userName: string = '';

  constructor() { }

  ngOnInit() {
  }

  setUserName() {
    this.userNameEvent.emit(this.userName)
  }

}
