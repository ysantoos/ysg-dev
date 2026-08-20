import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface HeroContent {
  name: string;
  subtitle: LocalizedText;
  quote: LocalizedText;
}

export interface AboutContent {
  description: LocalizedText;
}

export const SKILL_COLORS = ['orange', 'blue', 'purple', 'green', 'cyan'] as const;

export type SkillColor = (typeof SKILL_COLORS)[number];

export interface Skill {
  name: string;
  color: SkillColor;
}

export interface SkillCategory {
  name: LocalizedText;
  skills: Skill[];
}

export interface SkillsContent {
  categories: SkillCategory[];
}

export interface CourseItem {
  title: string;
  institution: string;
  year: number;
  color: SkillColor;
}

export interface CoursesContent {
  items: CourseItem[];
}

export interface SocialContact {
  url: string;
  description: LocalizedText;
}

export interface ContactContent {
  description: LocalizedText;
  github: SocialContact;
  linkedin: SocialContact;
}

interface RawSkill {
  name: string;
  color: string;
}

interface RawSkillCategory {
  name: LocalizedText;
  skills: RawSkill[];
}

interface RawSkillsContent {
  categories: RawSkillCategory[];
}

interface RawCourseItem {
  title: string;
  institution: string;
  year: number;
  color: string;
}

interface RawCoursesContent {
  items: RawCourseItem[];
}

interface RawContactContent {
  description: LocalizedText;
  github: SocialContact;
  linkedin: SocialContact;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);

  getHero() {
    return this.http.get<HeroContent>('/content/hero.json');
  }

  getAbout() {
    return this.http.get<AboutContent>('/content/about.json');
  }

  getSkills() {
    return this.http.get<RawSkillsContent>('/content/skills.json').pipe(
      map((content): SkillsContent => ({
        categories: content.categories.map((category) => ({
          name: category.name,
          skills: category.skills.map((skill) => ({
            name: skill.name,
            color: this.toSkillColor(skill.color),
          })),
        })),
      })),
    );
  }

  getCourses() {
    return this.http.get<RawCoursesContent>('/content/courses.json').pipe(
      map((content): CoursesContent => ({
        items: content.items.map((item) => ({
          title: item.title,
          institution: item.institution,
          year: item.year,
          color: this.toSkillColor(item.color),
        })),
      })),
    );
  }

  getContact() {
    return this.http.get<RawContactContent>('/content/contact.json');
  }

  private toSkillColor(color: string): SkillColor {
    return SKILL_COLORS.find((allowedColor) => allowedColor === color) ?? 'blue';
  }
}