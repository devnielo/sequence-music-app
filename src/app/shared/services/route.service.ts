import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SongState } from 'src/app/songs/store/reducers/song.reducer';
import { selectCurrentSong } from 'src/app/songs/store/selectors/song.selectors';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private pageTitleSource = new BehaviorSubject<string>('');
  private isMainPageRouteSource = new BehaviorSubject<boolean>(true);

  pageTitle$ = this.pageTitleSource.asObservable();
  isMainPageRoute$ = this.isMainPageRouteSource.asObservable();

  constructor(private router: Router, private store: Store<SongState>) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const urlSegments = event.urlAfterRedirects
            .split('/')
            .filter((seg) => seg);
          this.updatePageTitle(urlSegments);
        }
      });
  }

  private updatePageTitle(segments: string[]): void {
    if (segments.length === 0) {
      this.pageTitleSource.next('Inicio');
    } else {
      switch (segments[0]) {
        case 'songs':
          this.handleSongsRoute(segments);
          break;
        case 'artists':
          this.pageTitleSource.next('Artistas');
          break;
        case 'companies':
          this.pageTitleSource.next('Compañias discográficas');
          break;
        // Aquí puedes añadir más casos para otras rutas principales
        default:
          this.pageTitleSource.next('');
          break;
      }
    }
    this.updateIsMainPageRoute(segments);
  }

  private handleSongsRoute(segments: string[]): void {
    if (segments.length === 1) {
      this.pageTitleSource.next('Canciones');
    } else {
      const actionOrId = segments[1];
      if (actionOrId === 'add') {
        this.pageTitleSource.next('Nueva Canción');
      } else if (actionOrId === 'edit' && segments[2]) {
        // Actualizar título para la edición
        const id = +segments[2];
        this.store.select(selectCurrentSong, { id }).subscribe((song) => {
          if (song) this.pageTitleSource.next('Editando: ' + song.title);
        });
      } else {
        // Actualizar título para una canción específica
        const id = +actionOrId;
        this.store.select(selectCurrentSong, { id }).subscribe((song) => {
          if (song) this.pageTitleSource.next(song.title);
        });
      }
    }
  }

  private updateIsMainPageRoute(segments: string[]): void {
    // Rutas principales
    const mainRoutes = ['songs', 'artists', 'companies'];

    // Considerar la ruta principal solo si la URL corresponde exactamente a una ruta principal
    // sin segmentos adicionales (rutas hijas)
    this.isMainPageRouteSource.next(
      mainRoutes.includes(segments[0]) && segments.length === 1
    );
  }
}
