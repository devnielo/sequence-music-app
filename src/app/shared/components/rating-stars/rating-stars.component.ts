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
    `
  ]
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  starsArray: string[] = [];

  ngOnInit() {
    this.generateStars();
  }

  generateStars() {
    let remainingRating = this.rating;

    for (let i = 0; i < 5; i++) {
      if (remainingRating >= 1) {
        this.starsArray.push('&#9733;'); // Estrella llena
        remainingRating--;
      } else if (remainingRating >= 0.5) {
        this.starsArray.push('&#9734;'); // Estrella medio llena
        remainingRating = 0;
      } else {
        this.starsArray.push('&#9734;'); // Estrella vacía
      }
    }
  }
}
