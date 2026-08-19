import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Language, LanguageService } from '../../../../services/language.service';
import { UiTranslationsService } from '../../../../services/ui-translations.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)),
    { initialValue: null },
  );

  readonly languageService = inject(LanguageService);
  readonly ui = inject(UiTranslationsService);
  readonly menuOpen = signal(false);
  readonly activeSection = computed(() => {
    this.navigationEnd();
    const fragment = this.router.parseUrl(this.router.url).fragment;

    return fragment === 'about' || fragment === 'courses' || fragment === 'contact'
      ? fragment
      : 'home';
  });

  setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}