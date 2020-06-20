import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { StarsComponent } from './components/stars/stars.component';
import { UserComponent } from './components/user/user.component';
import { ScheduleComponent } from './components/schedule/schedule.component';



@NgModule({
  declarations: [StarsComponent, UserComponent, ScheduleComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot()
  ],
  exports: [UserComponent, ScheduleComponent]
})
export class SharedModule { }
