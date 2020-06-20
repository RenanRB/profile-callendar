import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [IndexComponent]
})
export class HomeModule { }
