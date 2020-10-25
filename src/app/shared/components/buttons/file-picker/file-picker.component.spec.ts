import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePickerComponent } from './file-picker.component';

describe('file picker component unit test', () => {
    let component: FilePickerComponent;
    let fixture: ComponentFixture<FilePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilePickerComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FilePickerComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
