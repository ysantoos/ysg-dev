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
  name: string;
  skills: Skill[];
}

export interface SkillsContent {
  categories: SkillCategory[];
}

interface RawSkill {
  name: string;
  color: string;
}

interface RawSkillCategory {
  name: string;
  skills: RawSkill[];
}

interface RawSkillsContent {
  categories: RawSkillCategory[];
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

  private toSkillColor(color: string): SkillColor {
    return SKILL_COLORS.find((allowedColor) => allowedColor === color) ?? 'blue';
  }
}