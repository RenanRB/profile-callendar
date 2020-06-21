import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {

  @Input() amountStars = 5;
  @Input() amountReviews = 0;
  @Input() note = 0;

  counter(i: number) {
    return new Array(i);
  }

}
