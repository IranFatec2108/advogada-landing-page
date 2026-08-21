// src/app/features/hero/hero.ts

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

  openWhatsApp(): void {
    const whatsappUrl = this.lawyer.getWhatsAppLink(
      'Olá, Dra. Ana Carolina. Encontrei seu site e gostaria de conversar.',
    );

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  scrollToServices(): void {
    document.getElementById('servicos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}