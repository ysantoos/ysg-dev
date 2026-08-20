import { Component, inject } from '@angular/core';
import { UiTranslationsService } from '../../../../services/ui-translations.service';

interface FooterBadge {
  label: string;
  tone: 'dark' | 'orange' | 'blue' | 'purple' | 'cyan' | 'red';
}

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly ui = inject(UiTranslationsService);

  readonly badges: FooterBadge[] = [
    { label: 'RACE RETRO', tone: 'dark' },
    { label: 'AI', tone: 'orange' },
    { label: 'TROUBLE MY BROWSER', tone: 'blue' },
    { label: 'CSS IS', tone: 'purple' },
    { label: 'EASY', tone: 'red' },
    { label: 'HTML5', tone: 'dark' },
    { label: 'COMPATIBLE', tone: 'dark' },
    { label: 'NOT EPAD', tone: 'dark' },
    { label: 'EDITOR', tone: 'dark' },
    { label: 'REJECT', tone: 'dark' },
    { label: 'AI SLOP', tone: 'red' },
  ];
}
