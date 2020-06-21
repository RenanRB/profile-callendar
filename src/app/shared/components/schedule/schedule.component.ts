import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { Calendar } from '../../models/calendar';
import { ScheduleService } from 'src/app/core/schedule.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  private readonly DAY = 'days';
  private readonly MINUTES = 'minutes';
  private readonly FORMAT_HOUR_MINUTE = 'HH:mm';
  private readonly FORMAT_DAY_OF_WEEK = 'ddd';
  private readonly FORMAT_MONTH = 'MMM';
  private readonly FORMAT_DAY = 'DD';
  private readonly FORMAT_ZONE = 'z';

  timezoneName: string;
  calendar = new Array<Calendar>();
  scheduledTime: Array<any>;
  indexes: number[];
  totalTimes = 5;
  totalDays = 4;
  
  constructor(private schedule: ScheduleService) { }

  ngOnInit(): void {
    this.timezoneName = this.getTimezoneName();
    this.generateCalendar();
  }

  onSlideRangeChange(indexes: number[]): void {
    this.indexes = indexes;
    let fork = [];
    indexes.forEach(index => {
      if (!this.calendar[index].scheduledTime) {
        fork.push(this.schedule.getDay(this.calendar[index].id));
      }
    });
    if (fork.length) {
      forkJoin(fork).subscribe(results => {
        results.forEach((result: any) => {
          if (result) {
            this.calendar.filter((calendar: Calendar) => calendar.id == result.id).map(calendar => calendar.scheduledTime = result.times);
          }
        });
        this.refreshList();
      });
      return;
    }
    this.refreshList();
  }

  counter(i: number): Array<undefined> {
    return new Array(i);
  }

  moreResults(): void {
    this.totalTimes += 5;
    if (this.totalTimes > this.scheduledTime.length) {
      this.totalTimes = this.scheduledTime.length;
    }
  }

  private refreshList(): void {
    this.scheduledTime.map(st => st.position = this.generateEnabled())
    this.indexes.forEach((value, index) => {
      if (this.calendar[value].scheduledTime) {
        this.calendar[value].scheduledTime.forEach(time => {
          this.scheduledTime.filter(schedule => schedule.time == time).forEach(result => result.position[index] = false);
        });
      }
    });
  }

  private getTimezoneName(): string {
    let date = moment.tz.guess();
    const zone = Number(moment.tz(date).format(this.FORMAT_ZONE));
    date = date.replace('_', ' ').replace('/', ' / ');
    return `${date} (${zone})`;
  }

  private generateCalendar(): void {
    const date = this.dateWithSpecificTime();
    while (date.year() == moment().year()) {
      this.calendar.push({
        id: date.valueOf(),
        dayWeek: date.format(this.FORMAT_DAY_OF_WEEK),
        month: date.format(this.FORMAT_MONTH),
        day: date.format(this.FORMAT_DAY)
      });
      date.add(1, this.DAY);
    }
    this.generateTime();
  }

  private dateWithSpecificTime(hour = 0, minute = 0, second = 0, millisecond = 0): moment.Moment {
    const date = moment();
    date.set({hour,minute,second,millisecond});
    return date;
  }

  private generateTime(): void {
    const scheduledTime = new Array();
    let date = this.dateWithSpecificTime(8);
    const enabled = this.generateEnabled();
    while (date.hours() <= 17 ) {
      scheduledTime.push({time: date.format(this.FORMAT_HOUR_MINUTE), position: enabled});
      date.add(30, this.MINUTES);
    }
    this.scheduledTime = scheduledTime;
  }

  private generateEnabled(): Array<boolean> {
    return new Array(this.totalDays).fill(undefined).map(i => true)
  }

}
