import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface HeroContent {
  name: string;
  subtitle: LocalizedText;
  quote: LocalizedText;
}

export interface AboutContent {
  description: LocalizedText;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);

  getHero() {
    return this.http.get<HeroContent>('/content/hero.json');
  }

  getAbout() {
    return this.http.get<AboutContent>('/content/about.json');
  }
}