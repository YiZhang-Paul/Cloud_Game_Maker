import { TestBed } from '@angular/core/testing';

import { GameSceneHttpService } from './game-scene-http.service';

describe('game scene http service unit test', () => {
    let service: GameSceneHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameSceneHttpService);
    });

    test('should be created', () => {
        expect(service).toBeTruthy();
    });
});
