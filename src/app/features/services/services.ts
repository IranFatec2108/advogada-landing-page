import { Component, computed, signal } from '@angular/core';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  readonly services: ServiceItem[] = [
    {
      id: 'tributario',
      number: '01',
      title: 'Direito tributário',
      description:
        'Orientação estratégica para compreender obrigações, riscos e oportunidades no contexto tributário.',
    },
    {
      id: 'planejamento',
      number: '02',
      title: 'Planejamento tributário',
      description:
        'Análise cuidadosa para estruturar decisões mais seguras, eficientes e alinhadas à realidade do cliente.',
    },
    {
      id: 'consultoria',
      number: '03',
      title: 'Consultoria jurídica',
      description:
        'Acompanhamento próximo para decisões jurídicas que exigem clareza, prevenção e estratégia.',
    },
    {
      id: 'regularizacao',
      number: '04',
      title: 'Regularização fiscal',
      description:
        'Avaliação de pendências e construção de caminhos responsáveis para reorganizar a situação fiscal.',
    },
    {
      id: 'defesa-administrativa',
      number: '05',
      title: 'Defesa administrativa',
      description:
        'Atuação estratégica em procedimentos administrativos, com análise cuidadosa de documentos e riscos.',
    },
    {
      id: 'assessoria',
      number: '06',
      title: 'Assessoria empresarial',
      description:
        'Acompanhamento jurídico preventivo para apoiar decisões empresariais com mais segurança e clareza.',
    },
  ];

  readonly activeIndex = signal(0);

  readonly currentPosition = computed(() =>
    String(this.activeIndex() + 1).padStart(2, '0'),
  );

  readonly totalPosition = String(this.services.length).padStart(2, '0');

  next(): void {
    const nextIndex = this.activeIndex() + 1;

    this.activeIndex.set(
      nextIndex >= this.services.length ? 0 : nextIndex,
    );
  }

  previous(): void {
    const previousIndex = this.activeIndex() - 1;

    this.activeIndex.set(
      previousIndex < 0 ? this.services.length - 1 : previousIndex,
    );
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.services.length) {
      this.activeIndex.set(index);
    }
  }
}