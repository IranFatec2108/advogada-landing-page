// src/app/shared/layout/header/header.ts

import {
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';

import { Lawyer } from '../../../core/state/lawyer';

interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly target: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly lawyer = inject(Lawyer);

  readonly profile = this.lawyer.profile;

  readonly isMenuOpen = signal(false);

  readonly navigationItems: readonly NavigationItem[] = [
    {
      id: 'home',
      label: 'Início',
      target: 'inicio',
    },
    {
      id: 'about',
      label: 'Sobre mim',
      target: 'sobre',
    },
    {
      id: 'services',
      label: 'Serviços',
      target: 'servicos',
    },
    {
      id: 'contact',
      label: 'Contato',
      target: 'contato',
    },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  navigateTo(target: string): void {
    this.closeMenu();

    document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeMenu();
  }
}