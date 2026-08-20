import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly formBuilder = inject(FormBuilder);

  private readonly whatsappNumber = '5519999880904';

  readonly submitted = signal(false);

  readonly areas = [
    'Direito tributário',
    'Planejamento tributário',
    'Consultoria jurídica',
    'Regularização fiscal',
    'Defesa administrativa',
    'Assessoria empresarial',
  ];

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    area: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    this.submitted.set(true);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, area, message } = this.contactForm.getRawValue();

    const whatsappMessage = [
      'Olá, Dra. Ana Carolina.',
      '',
      `Meu nome é ${name}.`,
      `Gostaria de conversar sobre: ${area}.`,
      '',
      'Minha situação é:',
      message,
      '',
      'Encontrei seu contato pelo site.',
    ].join('\n');

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl =
      `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  hasError(
    controlName: 'name' | 'area' | 'message',
    errorName: string,
  ): boolean {
    const control = this.contactForm.controls[controlName];

    return (
      control.hasError(errorName) &&
      (control.touched || this.submitted())
    );
  }
}