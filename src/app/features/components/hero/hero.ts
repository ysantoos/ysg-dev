import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../../../services/content.service';
import { LanguageService } from '../../../../services/language.service';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private contentService = inject(ContentService);
  languageService = inject(LanguageService);
  hero$ = this.contentService.getHero();
}
