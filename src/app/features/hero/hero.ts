import { Component, inject } from '@angular/core';

import { Lawyer } from '../../core/state/lawyer';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly lawyer = inject(Lawyer);

  readonly profile = this.lawyer.profile;

  scrollToContact(): void {
    document.getElementById('contato')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  scrollToServices(): void {
    document.getElementById('servicos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}