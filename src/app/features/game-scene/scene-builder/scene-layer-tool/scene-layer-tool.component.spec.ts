import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneLayerToolComponent } from './scene-layer-tool.component';

describe('scene layer tool component unit test', () => {
    let component: SceneLayerToolComponent;
    let fixture: ComponentFixture<SceneLayerToolComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SceneLayerToolComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SceneLayerToolComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
