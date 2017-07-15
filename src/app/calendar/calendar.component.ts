import { animate, Component, EventEmitter, Input, keyframes, OnInit, Output, style, transition, trigger } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogResult } from '../calendar-dialog/calendar-dialog.component'
import { CalendarService } from './calendar.service';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
import { LANG_EN } from './lang-en';

@Component({
  selector: 'md-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService],
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate('0.225s ease-in-out', keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 }),
        ]))
      ]),
      transition('* => right', [
        animate('0.225s ease-in-out', keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})

export class CalendarComponent implements OnInit {

  @Output()
  dateChange = new EventEmitter<Date>();

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  submit = new EventEmitter<Date>();

  @Input()
  get date(): Date {
    return this.dateVal;
  };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
    this.updateDate(val);
  }

  private readonly calendarService: CalendarService;
  private dateVal: Date;

  selectedOption: string;
  dayNames: Array<Weekday>;
  monthNames: Array<Month>;
  today: Date = new Date();
  currentMonth: Month;
  currentMonthNumber: number;
  currentYear: number;
  currentDay: number;
  currentDayOfWeek: Weekday;
  displayMonth: Month;
  displayMonthNumber: number;
  displayYear: number;
  displayDays: Array<number>;
  animate: string;

  currentDaySelector: Date;

  displayDaysObj: any[] = [];
  abnormalDays: any[] = [];


  constructor(calendarService: CalendarService, public dialog: MdDialog) {
    this.calendarService = calendarService;
    this.dayNames = LANG_EN.weekDays;
    this.monthNames = LANG_EN.months;
  }

  ngOnInit() {
    this.date = new Date();
    console.log(this.date);
    this.currentDaySelector = this.date;
    this.currentDaySelector.setHours(0,0,0);
    this.currentDaySelector.setMilliseconds(0);
    this.updateDate(this.date);
  }

  // are these needed??
  openDialog(day) {
      let dialogRef = this.dialog.open(DialogResult);
      let dayDate = new Date(day.day);
      dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  handleClick(day) {
    if(!day.festivi && !day.old) {
      this.openDialog(day);
    }
  }
 //----

  onToday() {
    this.date = this.today;
  }

  onPrevMonth() {
    if (this.displayMonthNumber > 0) {
      this.updateDisplay(this.displayYear, this.displayMonthNumber - 1);
    } else {
      this.updateDisplay(this.displayYear - 1, 11);
    }
    this.triggerAnimation('left');
  }

  onNextMonth() {
    if (this.displayMonthNumber < 11) {
      this.updateDisplay(this.displayYear, this.displayMonthNumber + 1);
    } else {
      this.updateDisplay(this.displayYear + 1, 0);
    }
    this.triggerAnimation('right');
  }

  onSelectDate(date: Date) {
    this.date = date;
  }

  private updateDate(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.monthNames[this.currentMonthNumber];
    this.currentYear = date.getFullYear();
    this.currentDay = date.getDate()-1;
    this.currentDayOfWeek = this.dayNames[(date.getDay())];
    this.updateDisplay(this.currentYear, this.currentMonthNumber);
  }

  private updateDisplay(year: number, month: number) {
    const calendarArray = this.calendarService.monthDays(year, month);
    this.displayDays = [].concat.apply([], calendarArray);
    this.displayMonthNumber = month;
    this.displayMonth = this.monthNames[month];
    this.displayYear = year;
    this.initializeCalendar();
  }

  private initializeCalendar() {
    this.displayDaysObj = [];
    for(let day of this.displayDays) {
      let dayDate = new Date(day);
      let dayObj = {
        'day': day,
        'festivi': false,
        'old': false,
      }

      if(dayDate.getDay() === 6 || dayDate.getDay() === 0) {
        dayObj.festivi = true;
      }

      if(dayDate.getTime() < this.today.getTime()) {
        dayObj.old = true;
      }

      this.displayDaysObj.push(dayObj);
    }
  }

  private equalsDate(date1: Date, date2: Date): boolean {
    try {
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    } catch (error) {
      return  false;
    }
  }

  private triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 230);
  }
}
