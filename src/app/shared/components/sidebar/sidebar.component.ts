import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
