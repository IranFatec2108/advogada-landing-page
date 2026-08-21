import {
  Injectable,
  Signal,
  computed,
  signal,
} from '@angular/core';

import { LegalService } from '../models/legal-service';
import { LawyerProfile } from '../models/lawyer-profile';

@Injectable({
  providedIn: 'root',
})
export class Lawyer {
  private readonly whatsappNumber =
    '5519999880904';

  private readonly selectedServiceState =
    signal<string | null>(null);

  private readonly profileState =
    signal<LawyerProfile>({
      name: 'Nome da advogada',
      professionalTitle: 'Advocacia especializada',
      heroHeadline:
        'Estratégia jurídica para proteger o que importa.',
      heroDescription:
        'Atendimento jurídico personalizado, com clareza, ética e dedicação em cada etapa.',
      aboutTitle:
        'Atuação jurídica com proximidade e estratégia',
      aboutDescription:
        'Conteúdo institucional da advogada será inserido após a validação das informações profissionais.',
      logoUrl: 'assets/images/logo-preta.jpg',
      portraitUrl: 'assets/images/hero-lawyer.webp',
    });

  private readonly servicesState =
    signal<readonly LegalService[]>([
      {
        id: 'service-1',
        title: 'Área de atuação 1',
        summary:
          'Resumo da primeira área de atuação.',
        description:
          'Descrição detalhada do serviço, que será definida com a advogada.',
        icon: 'scale',
      },
      {
        id: 'service-2',
        title: 'Área de atuação 2',
        summary:
          'Resumo da segunda área de atuação.',
        description:
          'Descrição detalhada do serviço, que será definida com a advogada.',
        icon: 'briefcase',
      },
      {
        id: 'service-3',
        title: 'Área de atuação 3',
        summary:
          'Resumo da terceira área de atuação.',
        description:
          'Descrição detalhada do serviço, que será definida com a advogada.',
        icon: 'document',
      },
    ]);

  readonly profile: Signal<LawyerProfile> =
    this.profileState.asReadonly();

  readonly services: Signal<
    readonly LegalService[]
  > = this.servicesState.asReadonly();

  readonly selectedService: Signal<string | null> =
    this.selectedServiceState.asReadonly();

  readonly serviceCount = computed(
    () => this.services().length,
  );

  selectService(serviceTitle: string): void {
    this.selectedServiceState.set(serviceTitle);
  }

  clearSelectedService(): void {
    this.selectedServiceState.set(null);
  }

  getWhatsAppLink(message: string): string {
    const encodedMessage =
      encodeURIComponent(message);

    return [
      'https://wa.me/',
      this.whatsappNumber,
      '?text=',
      encodedMessage,
    ].join('');
  }

  getDirectWhatsAppLink(): string {
    return this.getWhatsAppLink(
      'Olá, Dra. Ana Carolina. Encontrei seu site e gostaria de conversar.',
    );
  }

  getWhatsAppLinkForService(
    serviceTitle: string,
  ): string {
    const message = [
      'Olá, Dra. Ana Carolina.',
      '',
      `Gostaria de conversar sobre: ${serviceTitle}.`,
      '',
      'Encontrei seu contato pelo site.',
    ].join('\n');

    return this.getWhatsAppLink(message);
  }
}