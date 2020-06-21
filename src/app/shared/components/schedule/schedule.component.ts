import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';
import { Calendar } from '../../models/calendar';
import { ScheduleService } from 'src/app/core/schedule.service';
import { forkJoin } from 'rxjs';
import { TimesOfDay } from '../../models/timesOfDay';

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
  indexDayCalender: number[];
  @Input() totalTimes = 5;
  @Input() totalDays = 4;
  
  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.timezoneName = this.getTimezoneName();
    this.generateCalendar();
  }

  onSlideRangeChange(indexDayCalender: number[]): void {
    this.indexDayCalender = indexDayCalender;
    let fork = [];
    indexDayCalender.forEach(index => {
      if (!this.calendar[index].scheduledTime) {
        fork.push(this.scheduleService.getDay(this.calendar[index].id));
      }
    });
    if (fork.length) {
      forkJoin(fork).subscribe((results: Array<TimesOfDay>) => {
        results.forEach((result: TimesOfDay) => {
          if (result) {
            this.calendar.filter((calendar: Calendar) => calendar.id == result.id)
                         .map(calendar => calendar.scheduledTime = result.times);
            return;
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

  markTime(indexScheduledTime: number, positionDay: number): void {
    const positionCalendar = this.indexDayCalender[positionDay];
    const schedule = this.scheduledTime[indexScheduledTime].time;
    if (!this.calendar[positionCalendar].scheduledTime) {
      this.calendar[positionCalendar].scheduledTime = [];
    }
    if (this.isToday(positionCalendar)) { 
      this.ignoreDatePast(positionCalendar);
    }
    this.calendar[positionCalendar].scheduledTime
      .find(item => item == schedule) 
      ? this.removeItem(positionCalendar, schedule) 
      : this.addItem(positionCalendar, schedule);
  }

  private removeItem(positionCalendar:number, item: string): void {
    if (this.isToday(positionCalendar) && this.isDateGreaterThan(item)) {
      return;
    }
    const day = this.calendar[positionCalendar];
    day.scheduledTime.splice(day.scheduledTime.indexOf(item), 1);
    this.saveList(day);
  }

  private addItem(positionCalendar:number, item: string): void {
    const day = this.calendar[positionCalendar];
    day.scheduledTime.push(item);
    this.saveList(day);
  }

  private saveList(day: Calendar): void {
    const tod:TimesOfDay = {id: day.id, times: day.scheduledTime};
    this.scheduleService.getDay(tod.id)
      .subscribe(item => item 
        ? this.scheduleService.putDay(tod).subscribe() 
        : this.scheduleService.postDay(tod).subscribe());
    this.refreshList();
  }

  private ignoreDatePast(positionCalendar: number): void {
    const pastHours = this.getPastHours();
    this.calendar[positionCalendar].scheduledTime = this.calendar[positionCalendar].scheduledTime.filter( function( el ) {
      return !pastHours.includes( el );
    });
  }

  private refreshList(): void {
    this.scheduledTime.map(st => st.position = this.generateEnabled())
    this.indexDayCalender.forEach((value, index) => {
      if (this.isToday(value)) {
        this.disablePastHours(value);
      }
      if (this.calendar[value].scheduledTime) {
        this.calendar[value].scheduledTime.forEach(time => {
          this.scheduledTime.filter(schedule => schedule.time == time)
                            .forEach(result => result.position[index] = false);
        });
      }
    });
  }

  private isToday(indexCalendar: number): boolean {
    return this.calendar[indexCalendar].id == this.dateWithSpecificTime().valueOf();
  }

  private disablePastHours(index: number): void {
    if (!this.calendar[index].scheduledTime) {
      this.calendar[index].scheduledTime = [];
    }
    this.calendar[index].scheduledTime = this.calendar[index].scheduledTime.concat(this.getPastHours());
  }

  private getPastHours(): Array<string> {
    const times = this.generateTime().map(item => item.time);
    return times.filter(time => this.isDateGreaterThan(time));
  }

  private isDateGreaterThan(time: string): boolean {
    const currentDate = moment();
    return currentDate.diff(moment(`${currentDate.format('YYYY-MM-DD')} ${time}`)) >= 0;
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
    this.scheduledTime = this.generateTime();
  }

  private dateWithSpecificTime(hour = 0, minute = 0, second = 0, millisecond = 0): moment.Moment {
    const date = moment();
    date.set({hour,minute,second,millisecond});
    return date;
  }

  private generateTime(): Array<any> {
    const scheduledTime = new Array();
    let date = this.dateWithSpecificTime(8);
    const enabled = this.generateEnabled();
    while (date.hours() <= 17 ) {
      scheduledTime.push({time: date.format(this.FORMAT_HOUR_MINUTE), position: enabled});
      date.add(30, this.MINUTES);
    }
    return scheduledTime;
  }

  private generateEnabled(): Array<boolean> {
    return new Array(this.totalDays).fill(undefined).map(i => true)
  }

}
