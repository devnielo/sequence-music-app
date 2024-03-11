import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLanguage: string = 'es'; // idioma predeterminado

  constructor() { }

  setLanguage(language: string) {
    this.selectedLanguage = language;
  }

  getLanguage(): string {
    return this.selectedLanguage;
  }
}
