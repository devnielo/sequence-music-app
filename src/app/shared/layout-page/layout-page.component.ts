import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  // styleUrls: ['./layout-page.component.css'] // si tienes estilos
})
export class LayoutPageComponent {
  currentRoute: string = '';
  adding: boolean = false;
  title: string = '';
  showSidebar: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Extrae la ruta de nivel superior
        const rootRoute = event.url.split('/')[1];
        if (this.currentRoute !== rootRoute) {
          this.currentRoute = rootRoute;
          this.title = this.getTitle(rootRoute);
        }
        this.adding = event.url.includes('add');
      }
    });
  }

  getTitle(route: string): string {
    switch (route) {
      case 'songs':
        return 'Canciones';
      case 'artists':
        return 'Artistas';
      case 'companies':
        return 'Compañías';
      default:
        return '';
    }
  }

  navigateToAdd(): void {
    const addRoute = this.currentRoute + '/add';
    this.router.navigate([addRoute]);
  }

  cancelAdd(): void {
    this.router.navigate(['/' + this.currentRoute]);
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
