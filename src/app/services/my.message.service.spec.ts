import { TestBed } from '@angular/core/testing';

import { MyMessageServiceService } from './my.message.service';

describe('MyMessageServiceService', () => {
  let service: MyMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
