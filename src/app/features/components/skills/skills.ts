import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { ContentService, SkillColor, SkillsContent } from '../../../../services/content.service';
import { UiTranslationsService } from '../../../../services/ui-translations.service';

interface SkillsViewModel {
  skills: SkillsContent | null;
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly contentService = inject(ContentService);

  readonly ui = inject(UiTranslationsService);

  readonly vm$ = this.contentService.getSkills().pipe(
    map((skills): SkillsViewModel => ({ skills, loading: false, error: false })),
    startWith({ skills: null, loading: true, error: false }),
    catchError(() => of({ skills: null, loading: false, error: true })),
  );

  badgeVariant(color: SkillColor): string {
    switch (color) {
      case 'orange':
        return 'skill-badge--orange';
      case 'purple':
        return 'skill-badge--purple';
      case 'green':
        return 'skill-badge--green';
      case 'cyan':
        return 'skill-badge--cyan';
      case 'blue':
      default:
        return 'skill-badge--blue';
    }
  }
}
