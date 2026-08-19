import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface HeroContent {
  name: string;
  subtitle: {
    en: string;
    es: string;
  };
  quote: {
    en: string;
    es: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);

  getHero() {
    return this.http.get<HeroContent>('/content/hero.json');
  }
}