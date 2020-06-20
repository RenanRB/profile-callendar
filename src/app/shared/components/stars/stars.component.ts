import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input() amountStars = 5;
  @Input() amountReviews = 0;
  @Input() note = 0;
  

  constructor() { }

  ngOnInit() {
  }

  counter(i: number) {
    return new Array(i);
  }

}
