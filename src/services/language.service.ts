import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export type Language = 'en' | 'es';

const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'es'];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly router = inject(Router);

  readonly currentLanguage = signal<Language>('en');

  getBrowserLanguage(): Language {
    const language = typeof navigator === 'undefined' ? 'en' : navigator.language.toLowerCase();

    return language.startsWith('es') ? 'es' : 'en';
  }

  syncFromRoute(language: string | null): boolean {
    if (!this.isSupportedLanguage(language)) {
      return false;
    }

    this.currentLanguage.set(language);
    return true;
  }

  setLanguage(language: Language): void {
    const currentUrl = this.router.parseUrl(this.router.url);

    void this.router.navigate(['/', language], {
      fragment: currentUrl.fragment ?? undefined,
    });
  }

  private isSupportedLanguage(language: string | null): language is Language {
    return language !== null && SUPPORTED_LANGUAGES.includes(language as Language);
  }
}