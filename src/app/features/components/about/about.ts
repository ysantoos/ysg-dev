import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, map, of, startWith } from 'rxjs';
import { AboutContent, ContentService } from '../../../../services/content.service';
import { LanguageService } from '../../../../services/language.service';
import { UiTranslationsService } from '../../../../services/ui-translations.service';
import { Skills } from '../skills/skills';

interface AboutViewModel {
  about: AboutContent | null;
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AsyncPipe, Skills],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly contentService = inject(ContentService);

  readonly languageService = inject(LanguageService);
  readonly ui = inject(UiTranslationsService);

  readonly vm$ = this.contentService.getAbout().pipe(
    map((about): AboutViewModel => ({ about, loading: false, error: false })),
    startWith({ about: null, loading: true, error: false }),
    catchError(() => of({ about: null, loading: false, error: true })),
  );
}
