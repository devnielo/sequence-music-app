// layout-page.component.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SongState } from 'src/app/songs/store/reducers/song.reducer';
import { selectSongsLoading } from 'src/app/songs/store/selectors/song.selectors';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
  showSidebar: boolean = false;
  isLoading: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    private store: Store<SongState>,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService
  ) {
    this.store.pipe(select(selectSongsLoading)).subscribe((loading) => {
      setTimeout(() => {
        this.isLoading = loading;
        this.cdr.detectChanges();
      });
    });
  }

  getCurrentLanguage(): string {
    return this.languageService.getLanguage();
  }

  changeLanguage(language: string) {
    console.log(language);
    this.languageService.setLanguage(language);
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
