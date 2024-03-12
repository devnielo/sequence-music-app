import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-rating',
  template: `
    <div class="rating-stars">
      <ng-container *ngFor="let star of starsArray">
        <span [innerHTML]="star"></span>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .rating-stars {
        color: gold;
        font-size: 1.25rem;
      }
    `,
  ],
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  starsArray: string[] = [];

  ngOnInit() {
    this.generateStars();
  }

  generateStars() {
    this.starsArray = [];
    let remainingRating = this.rating / 2;

    for (let i = 0; i < 5; i++) {
      if (remainingRating >= 1) {
        this.starsArray.push('&#9733;');
        remainingRating--;
      } else {
        if (i === 4 && remainingRating > 0) {
          this.starsArray.push('&#9734;');
        } else {
          this.starsArray.push('&#9734;');
        }
        remainingRating = 0;
      }
    }
  }
}
