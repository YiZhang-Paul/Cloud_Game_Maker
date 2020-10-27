import { TestBed } from '@angular/core/testing';

import { CloudStorageHttpService } from './cloud-storage-http.service';

describe('cloud storage service unit test', () => {
    let service: CloudStorageHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CloudStorageHttpService);
    });

    test('should be created', () => {
        expect(service).toBeTruthy();
    });
});
