import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneToolTogglesComponent } from './scene-tool-toggles.component';

describe('scene tool toggles component unit test', () => {
    let component: SceneToolTogglesComponent;
    let fixture: ComponentFixture<SceneToolTogglesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SceneToolTogglesComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SceneToolTogglesComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
