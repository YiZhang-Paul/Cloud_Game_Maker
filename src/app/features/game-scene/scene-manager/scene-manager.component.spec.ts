import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneManagerComponent } from './scene-manager.component';

describe('scene manager component unit test', () => {
    let component: SceneManagerComponent;
    let fixture: ComponentFixture<SceneManagerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SceneManagerComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SceneManagerComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
