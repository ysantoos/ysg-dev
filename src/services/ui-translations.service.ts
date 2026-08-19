import { Injectable, computed, inject } from '@angular/core';
import { Language, LanguageService } from './language.service';

export interface UiCopy {
  navigation: {
    home: string;
    about: string;
    courses: string;
    contact: string;
  };
  sections: {
    aboutMe: string;
  };
  content: {
    unavailable: string;
  };
  language: {
    menu: string;
    select: string;
  };
}

const UI_COPY: Record<Language, UiCopy> = {
  en: {
    navigation: {
      home: 'Home',
      about: 'About',
      courses: 'Courses',
      contact: 'Contact',
    },
    sections: {
      aboutMe: 'ABOUT_ME',
    },
    content: {
      unavailable: 'Content unavailable.',
    },
    language: {
      menu: 'Open navigation menu',
      select: 'Select language',
    },
  },
  es: {
    navigation: {
      home: 'Inicio',
      about: 'Acerca',
      courses: 'Cursos',
      contact: 'Contacto',
    },
    sections: {
      aboutMe: 'SOBRE_MI',
    },
    content: {
      unavailable: 'Contenido no disponible.',
    },
    language: {
      menu: 'Abrir menu de navegacion',
      select: 'Seleccionar idioma',
    },
  },
};

@Injectable({ providedIn: 'root' })
export class UiTranslationsService {
  private readonly languageService = inject(LanguageService);

  readonly copy = computed(() => UI_COPY[this.languageService.currentLanguage()]);
}