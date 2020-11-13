import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneViewportComponent } from './scene-viewport.component';

describe('scene viewport component unit test', () => {
    let component: SceneViewportComponent;
    let fixture: ComponentFixture<SceneViewportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SceneViewportComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SceneViewportComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
