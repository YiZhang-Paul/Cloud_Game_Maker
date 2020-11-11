import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTabComponent } from './file-tab.component';

describe('file tab component unit test', () => {
    let component: FileTabComponent;
    let fixture: ComponentFixture<FileTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileTabComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FileTabComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
