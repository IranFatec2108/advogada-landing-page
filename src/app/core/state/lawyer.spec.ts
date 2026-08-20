import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Lawyer } from './lawyer';

describe('Lawyer', () => {
  let service: Lawyer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lawyer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the lawyer profile', () => {
    expect(service.profile().name).toBe('Nome da advogada');
  });

  it('should expose legal services', () => {
    expect(service.services().length).toBe(3);
  });

  it('should expose the number of services', () => {
    expect(service.serviceCount()).toBe(3);
  });
});