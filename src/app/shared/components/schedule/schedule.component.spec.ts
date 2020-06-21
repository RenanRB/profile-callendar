import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ScheduleComponent } from './schedule.component';
import { SharedModule } from '../../shared.module';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    component.indexDayCalender = [0, 1, 2, 3];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save/remove schedule', () => {
    getElement('#more1').click();
    executeSaveRemove();
    executeSaveRemove();
  });

  function executeSaveRemove(): void {
    const value = getElement('#c1l1 div').innerText;
    getElement('#c1l1').click();
    fixture.detectChanges();
    expect(getElement('#c1l1 div').innerText).toEqual(value == '-' ? '08:30': '-');
  }

  function getElement(element: string): HTMLDivElement {
    return document.querySelector(element) as HTMLDivElement;
  }
});
