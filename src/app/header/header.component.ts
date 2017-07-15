import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() todayEmit: EventEmitter<boolean> = new EventEmitter();

  todayClick(todayClicked: boolean) {
    todayClicked = true;
    this.todayEmit.emit(todayClicked);
  }
}
