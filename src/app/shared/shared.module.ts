import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from './components/stars/stars.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [StarsComponent, UserComponent],
  imports: [
    CommonModule
  ],
  exports: [UserComponent]
})
export class SharedModule { }
