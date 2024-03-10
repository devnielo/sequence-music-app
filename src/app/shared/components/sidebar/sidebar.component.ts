import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }
  closeSidebarWithDelay() {
    setTimeout(() => {
      this.closeSidebar();
    }, 300);
  }
}
