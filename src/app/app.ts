import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/components/hero/hero';
import { Navbar } from './features/components/navbar/navbar';
import { About } from './features/components/about/about';

@Component({
  selector: 'app-root',
  imports: [Hero, Navbar, About, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
