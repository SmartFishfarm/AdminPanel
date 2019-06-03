import { TestBed } from '@angular/core/testing';

import { NgbDateCustomParserService } from './ngb-date-custom-parser.service';

describe('NgbDateCustomParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgbDateCustomParserService = TestBed.get(NgbDateCustomParserService);
    expect(service).toBeTruthy();
  });
});
