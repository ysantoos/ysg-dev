import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { ContentService, CourseItem, SkillColor } from '../../../../services/content.service';
import { UiTranslationsService } from '../../../../services/ui-translations.service';

interface CoursesViewModel {
  courses: CourseItem[] | null;
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  private readonly contentService = inject(ContentService);

  readonly ui = inject(UiTranslationsService);

  readonly vm$ = this.contentService.getCourses().pipe(
    map((content): CoursesViewModel => ({ courses: content.items, loading: false, error: false })),
    startWith({ courses: null, loading: true, error: false }),
    catchError(() => of({ courses: null, loading: false, error: true })),
  );

  trackCourse(course: CourseItem): string {
    return `${course.title}::${course.institution}::${course.year}`;
  }

  markerVariant(color: SkillColor): string {
    switch (color) {
      case 'orange':
        return 'courses__marker--orange';
      case 'purple':
        return 'courses__marker--purple';
      case 'green':
        return 'courses__marker--green';
      case 'cyan':
        return 'courses__marker--cyan';
      case 'blue':
      default:
        return 'courses__marker--blue';
    }
  }

  markerLabel(title: string): string {
    const trimmedTitle = title.trim();
    return trimmedTitle.length > 0 ? trimmedTitle.charAt(0).toUpperCase() : '*';
  }
}
