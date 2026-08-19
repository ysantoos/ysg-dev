import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { ContentService, ContactContent } from '../../../../services/content.service';
import { LanguageService } from '../../../../services/language.service';
import { UiTranslationsService } from '../../../../services/ui-translations.service';

interface ContactViewModel {
  contact: ContactContent | null;
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly contentService = inject(ContentService);

  readonly languageService = inject(LanguageService);
  readonly ui = inject(UiTranslationsService);

  readonly vm$ = this.contentService.getContact().pipe(
    map((contact): ContactViewModel => ({ contact, loading: false, error: false })),
    startWith({ contact: null, loading: true, error: false }),
    catchError(() => of({ contact: null, loading: false, error: true })),
  );
}
