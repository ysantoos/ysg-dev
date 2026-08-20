import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/components/hero/hero';
import { Navbar } from './features/components/navbar/navbar';
import { About } from './features/components/about/about';
import { Courses } from './features/components/courses/courses';
import { Contact } from './features/components/contact/contact';
import { Footer } from './features/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Hero, Navbar, About, Courses, Contact, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
