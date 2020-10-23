import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneBuilderComponent } from './scene-builder.component';

describe('scene builder component unit test', () => {
    let component: SceneBuilderComponent;
    let fixture: ComponentFixture<SceneBuilderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SceneBuilderComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SceneBuilderComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
