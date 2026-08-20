// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Componentes da aplicação
import { Header } from './shared/layout/header/header';
import { Hero } from './features/hero/hero';
import { About } from './features/about/about';
import { Services } from './features/services/services';
import { Contact } from './features/contact/contact';
import { Footer } from './shared/layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Hero,
    About,
    Services,
    Contact,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'advogada-landing-page';
}