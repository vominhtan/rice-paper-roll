import { TestBed } from '@angular/core/testing';

import { FirebaseGameService } from './firebase-game.service';

describe('FirebaseGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseGameService = TestBed.get(FirebaseGameService);
    expect(service).toBeTruthy();
  });
});
