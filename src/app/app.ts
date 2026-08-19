import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './features/components/hero/hero';
import { Navbar } from './features/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Hero, Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
