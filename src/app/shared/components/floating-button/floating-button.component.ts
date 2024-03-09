import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent {
  @Input() icon: any;
  @Output() action = new EventEmitter<void>();
  @Input() bgColor: string = '';

  onClick(): void {
    this.action.emit();
  }
}
