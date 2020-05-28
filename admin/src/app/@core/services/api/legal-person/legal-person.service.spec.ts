/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LegalPersonService } from './legal-person.service';

describe('Service: LegalPerson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalPersonService]
    });
  });

  it('should ...', inject([LegalPersonService], (service: LegalPersonService) => {
    expect(service).toBeTruthy();
  }));
});
