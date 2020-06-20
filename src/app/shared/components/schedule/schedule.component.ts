import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Calendar } from '../../models/calendar';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  private readonly DAY = 'days';
  private readonly FORMAT_DAY_OF_WEEK = 'ddd';
  private readonly FORMAT_MONTH = 'MMM';
  private readonly FORMAT_DAY = 'DD';

  calendar = new Array<Calendar>();
  constructor() { }

  ngOnInit() {
    this.generateCalendar();
  }

  private generateCalendar() {
    const date = moment();
    while (date.year() == moment().year()) {
      this.calendar.push({
        dayWeek: date.format(this.FORMAT_DAY_OF_WEEK),
        month: date.format(this.FORMAT_MONTH),
        day: date.format(this.FORMAT_DAY)
      });
      date.add(1, this.DAY);
    }
  }

}
