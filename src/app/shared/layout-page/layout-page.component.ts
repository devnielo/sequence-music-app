import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SongState } from 'src/app/songs/store/reducers/song.reducer';
import { selectSongsLoading } from 'src/app/songs/store/selectors/song.selectors';
import { LanguageService } from '../services/language.service';
import { RouteService } from '../services/route.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],

})
export class LayoutPageComponent implements OnDestroy {
  showSidebar: boolean = false;
  isLoading: boolean = false;
  pageTitle: string = '';
  isMainRoute: boolean = true; // Variable local para almacenar el valor de isMainRoute

  private isMainRouteSubscription: Subscription; // Suscripción para isMainRoute

  constructor(
    private store: Store<SongState>,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService,
    public routeService: RouteService
  ) {
    this.store.pipe(select(selectSongsLoading)).subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges();
    });

    this.routeService.pageTitle$.subscribe((title) => {
      this.pageTitle = title;
    });

    // Suscribirse a isMainRoute y almacenar su valor actual
    this.isMainRouteSubscription = this.routeService.isMainPageRoute$.subscribe((isMainRoute) => {
      this.isMainRoute = isMainRoute;
    });
  }

  ngOnDestroy() {
    // Liberar la suscripción cuando el componente se destruye para evitar fugas de memoria
    this.isMainRouteSubscription.unsubscribe();
  }

  getCurrentLanguage(): string {
    return this.languageService.getLanguage();
  }

  changeLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  navigateBack(): void {
    window.history.back();
  }
}
