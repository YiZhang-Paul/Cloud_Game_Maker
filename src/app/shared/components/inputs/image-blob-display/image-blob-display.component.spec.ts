import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlobDisplayComponent } from './image-blob-display.component';

describe('image blob display component unit test', () => {
    let component: ImageBlobDisplayComponent;
    let fixture: ComponentFixture<ImageBlobDisplayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageBlobDisplayComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ImageBlobDisplayComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
