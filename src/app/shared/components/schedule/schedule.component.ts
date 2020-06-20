import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = true;

  slides = [
    {dayWeek: 'MON', month: 'AUG', day: '19'},
    {dayWeek: 'TUE', month: 'AUG', day: '20'},
    {dayWeek: 'WED', month: 'AUG', day: '21'},
    {dayWeek: 'THU', month: 'AUG', day: '22'},
    {dayWeek: 'FRI', month: 'SET', day: '23'}
  ];
  constructor() { }

  ngOnInit() {
  }


}
