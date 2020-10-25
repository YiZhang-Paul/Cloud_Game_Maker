import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteEditorComponent } from './sprite-editor.component';

describe('sprite editor component unit test', () => {
    let component: SpriteEditorComponent;
    let fixture: ComponentFixture<SpriteEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpriteEditorComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SpriteEditorComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
