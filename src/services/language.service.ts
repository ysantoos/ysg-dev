import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage = signal<Language>(this.getBrowserLanguage());

  private getBrowserLanguage(): Language {
    const language = navigator.language.toLowerCase();

    return language.startsWith('es') ? 'es' : 'en';
  }

  setLanguage(language: Language) {
    this.currentLanguage.set(language);
  }

  toggleLanguage() {
    this.currentLanguage.update(language =>
      language === 'en' ? 'es' : 'en'
    );
  }
}