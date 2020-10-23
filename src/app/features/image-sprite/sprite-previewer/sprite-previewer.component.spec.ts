import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpritePreviewerComponent } from './sprite-previewer.component';

describe('sprite previewer component unit test', () => {
    let component: SpritePreviewerComponent;
    let fixture: ComponentFixture<SpritePreviewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpritePreviewerComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SpritePreviewerComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
