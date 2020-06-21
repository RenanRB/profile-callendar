import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsComponent } from './stars.component';

describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function changeInputs() {
    component.amountStars = 4;
    component.amountReviews = 100;
    component.note = 3;
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(document.querySelectorAll('.bi-star-fill').length === 5).toBeTruthy();
    expect(document.querySelectorAll('.star-checked').length === 0).toBeTruthy();
    expect(document.querySelector('#amountReviews').innerHTML).toEqual('0');
  });

  it('must get the new parameters', () => {
    changeInputs();
    expect(document.querySelectorAll('.bi-star-fill').length === 4).toBeTruthy();
    expect(document.querySelectorAll('.star-checked').length === 3).toBeTruthy();
    expect(document.querySelector('#amountReviews').innerHTML).toEqual('100');
  });
});
