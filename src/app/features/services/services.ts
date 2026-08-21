import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Lawyer } from '../../core/state/lawyer';

interface ServiceItem {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly imageUrl: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly lawyer = inject(Lawyer);

  readonly services: readonly ServiceItem[] = [
    {
      id: 'tributario',
      number: '01',
      title: 'Direito tributário',
      summary:
        'Orientação estratégica para compreender obrigações, riscos e oportunidades.',
      description:
        'A atuação em Direito Tributário envolve a análise cuidadosa de obrigações, riscos e possibilidades relacionadas à realidade fiscal de pessoas e empresas. O objetivo é oferecer clareza para que cada decisão seja tomada com mais segurança, responsabilidade e compreensão do contexto.',
      imageUrl:
        '/assets/images/service-tributario.webp',
    },
    {
      id: 'planejamento',
      number: '02',
      title: 'Planejamento tributário',
      summary:
        'Estratégias mais seguras e alinhadas à realidade de cada cliente.',
      description:
        'O planejamento tributário permite avaliar cenários e organizar decisões de maneira responsável, considerando a realidade financeira, operacional e patrimonial de cada cliente. A análise deve ser personalizada, técnica e orientada à prevenção de riscos.',
      imageUrl:
        '/assets/images/service-planejamento.webp',
    },
    {
      id: 'consultoria',
      number: '03',
      title: 'Consultoria jurídica',
      summary:
        'Acompanhamento próximo para decisões que exigem clareza.',
      description:
        'A consultoria jurídica oferece suporte para compreender situações, prevenir problemas e tomar decisões com mais segurança. Cada orientação parte da análise do contexto apresentado e busca traduzir questões jurídicas complexas em caminhos mais claros.',
      imageUrl:
        '/assets/images/service-consultoria.webp',
    },
    {
      id: 'regularizacao',
      number: '04',
      title: 'Regularização fiscal',
      summary:
        'Caminhos responsáveis para reorganizar situações fiscais.',
      description:
        'A regularização fiscal começa pela compreensão das pendências, dos documentos disponíveis e dos riscos envolvidos. A partir dessa avaliação, podem ser construídos caminhos responsáveis para reorganizar a situação e buscar maior previsibilidade.',
      imageUrl:
        '/assets/images/service-regularizacao.webp',
    },
    {
      id: 'defesa-administrativa',
      number: '05',
      title: 'Defesa administrativa',
      summary:
        'Análise estratégica de procedimentos, documentos e riscos.',
      description:
        'A defesa administrativa exige atenção aos prazos, documentos, fundamentos e particularidades de cada procedimento. A atuação busca organizar a análise do caso e construir uma resposta técnica, coerente e adequada ao contexto apresentado.',
      imageUrl:
        '/assets/images/service-defesa.webp',
    },
    {
      id: 'assessoria',
      number: '06',
      title: 'Assessoria empresarial',
      summary:
        'Apoio jurídico preventivo para decisões empresariais.',
      description:
        'A assessoria empresarial contribui para que decisões e rotinas da empresa sejam avaliadas com maior clareza jurídica. O acompanhamento preventivo pode ajudar a identificar riscos, organizar processos e apoiar escolhas mais conscientes.',
      imageUrl:
        '/assets/images/service-assessoria.webp',
    },
  ];

  readonly activeIndex = signal(0);

  readonly selectedService =
    signal<ServiceItem | null>(null);

  readonly currentPosition = computed(() =>
    String(this.activeIndex() + 1).padStart(2, '0'),
  );

  readonly totalPosition = String(
    this.services.length,
  ).padStart(2, '0');

  next(): void {
    const nextIndex = this.activeIndex() + 1;

    this.activeIndex.set(
      nextIndex >= this.services.length ? 0 : nextIndex,
    );
  }

  previous(): void {
    const previousIndex = this.activeIndex() - 1;

    this.activeIndex.set(
      previousIndex < 0
        ? this.services.length - 1
        : previousIndex,
    );
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.services.length) {
      this.activeIndex.set(index);
    }
  }

  openDetails(service: ServiceItem): void {
    this.selectedService.set(service);

    queueMicrotask(() => {
      const dialog = document.getElementById(
        'service-details-dialog',
      ) as HTMLDialogElement | null;

      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    });
  }

  closeDetails(): void {
    const dialog = document.getElementById(
      'service-details-dialog',
    ) as HTMLDialogElement | null;

    if (dialog?.open) {
      dialog.close();
    }

    this.selectedService.set(null);
  }

  talkAboutService(service: ServiceItem): void {
    this.lawyer.selectService(service.title);
    this.closeDetails();

    queueMicrotask(() => {
      document
        .getElementById('contato')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  }

  closeOnBackdrop(event: MouseEvent): void {
    const dialog = event.currentTarget as HTMLDialogElement;

    if (event.target === dialog) {
      this.closeDetails();
    }
  }
}