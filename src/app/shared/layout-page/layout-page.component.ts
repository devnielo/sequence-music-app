import { Component, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SongState } from 'src/app/songs/store/reducers/song.reducer';
import { selectSongsLoading } from 'src/app/songs/store/selectors/song.selectors';
import { LanguageService } from '../services/language.service';
import { RouteService } from '../services/route.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
    public routeService: RouteService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {
    this.store.pipe(select(selectSongsLoading)).subscribe((loading) => {
      // Wrapping the property update in setTimeout to prevent NG0100 error
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.isLoading = loading;
          this.cdr.detectChanges();
        });
      });
    });

    this.routeService.pageTitle$.subscribe((title) => {
      // Wrapping the property update in setTimeout to prevent NG0100 error
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.pageTitle = title;
          this.cdr.detectChanges();
        });
      });
    });

    // Suscribirse a isMainRoute y almacenar su valor actual
    this.isMainRouteSubscription = this.routeService.isMainPageRoute$.subscribe(
      (isMainRoute) => {
        // Wrapping the property update in setTimeout to prevent NG0100 error
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.isMainRoute = isMainRoute;
            this.cdr.detectChanges();
          });
        });
      }
    );
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
    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    this.translate.use(language);
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  navigateBack(): void {
    window.history.back();
  }
}
