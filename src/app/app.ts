import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/components/hero/hero';
import { Navbar } from './features/components/navbar/navbar';
import { About } from './features/components/about/about';
import { Courses } from './features/components/courses/courses';

@Component({
  selector: 'app-root',
  imports: [Hero, Navbar, About, Courses, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
