import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { ContentService } from './content.service';
import { Language } from './language.service';

const SITE_URL = 'https://yeisongarciasantos.netlify.app';
const SITE_NAME = 'Yeison García Santos';

const DEFAULT_DESCRIPTIONS: Record<Language, string> = {
  en: 'Software developer focused on enterprise software, product thinking, and adaptable software architecture.',
  es: 'Desarrollador de software enfocado en software empresarial, producto y arquitectura adaptable.',
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly contentService = inject(ContentService);

  initialize(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
      map((url) => this.getLanguage(url)),
      filter((language): language is Language => language !== null),
      distinctUntilChanged(),
      switchMap((language) => {
        this.updateLanguageMetadata(language);

        return this.contentService.getAbout().pipe(
          map((content) => ({
            language,
            description: this.truncateDescription(content.description[language]),
          })),
          catchError((error: unknown) => {
            console.error('Could not load localized SEO description.', error);
            return of(null);
          }),
        );
      }),
    ).subscribe((metadata) => {
      if (metadata) {
        this.updateDescription(metadata.description);
      }
    });
  }

  private getLanguage(url: string): Language | null {
    const firstSegment = this.router.parseUrl(url).root.children['primary']?.segments[0]?.path;
    return firstSegment === 'en' || firstSegment === 'es' ? firstSegment : null;
  }

  private updateLanguageMetadata(language: Language): void {
    const localizedTitle = language === 'es'
      ? `${SITE_NAME} | Desarrollador de software`
      : `${SITE_NAME} | Software Developer`;
    const canonicalUrl = `${SITE_URL}/${language}`;

    this.document.documentElement.lang = language;
    this.title.setTitle(localizedTitle);
    this.updateDescription(DEFAULT_DESCRIPTIONS[language]);
    this.meta.updateTag({ property: 'og:title', content: localizedTitle });
    this.meta.updateTag({ name: 'twitter:title', content: localizedTitle });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({
      property: 'og:locale',
      content: language === 'es' ? 'es_ES' : 'en_US',
    });

    this.setLinkUrl('canonical', canonicalUrl);
  }

  private updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  private setLinkUrl(rel: string, href: string): void {
    const link = this.document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

    if (link) {
      link.href = href;
    }
  }

  private truncateDescription(description: string): string {
    const normalizedDescription = description.trim().replace(/\s+/g, ' ');
    const maxLength = 160;

    if (normalizedDescription.length <= maxLength) {
      return normalizedDescription;
    }

    return `${normalizedDescription.slice(0, maxLength - 1).trimEnd()}…`;
  }
}
