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
    coreToolkit: string;
    coursesAndCerts: string;
    getInTouch: string;
  };
  contact: {
    linksLabel: string;
    githubAriaLabel: string;
    linkedinAriaLabel: string;
  };
  footer: {
    badgesLabel: string;
    copy: string;
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
      coreToolkit: 'CORE_TOOLKIT',
      coursesAndCerts: 'COURSES_&_CERTS',
      getInTouch: 'GET_IN_TOUCH',
    },
    contact: {
      linksLabel: 'Primary contact links',
      githubAriaLabel: 'Visit GitHub profile',
      linkedinAriaLabel: 'Visit LinkedIn profile',
    },
    footer: {
      badgesLabel: 'Footer retro badges',
      copy: '© 1992-2026 Yeison Garcia Santos. All rights reserved. Best viewed at 1024x768 resolution.',
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
      coreToolkit: 'HERRAMIENTAS',
      coursesAndCerts: 'CURSOS_Y_CERTS',
      getInTouch: 'CONTACTO',
    },
    contact: {
      linksLabel: 'Canales principales de contacto',
      githubAriaLabel: 'Visitar perfil de GitHub',
      linkedinAriaLabel: 'Visitar perfil de LinkedIn',
    },
    footer: {
      badgesLabel: 'Insignias retro del pie de pagina',
      copy: '© 1992-2026 Yeison Garcia Santos. Todos los derechos reservados. Mejor visto a 1024x768.',
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