import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDisplayPanelComponent } from './image-display-panel.component';

describe('image display panel component unit test', () => {
    let component: ImageDisplayPanelComponent;
    let fixture: ComponentFixture<ImageDisplayPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageDisplayPanelComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ImageDisplayPanelComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
