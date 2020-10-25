import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteManagerToolbarComponent } from './sprite-manager-toolbar.component';

describe('sprite manager toolbar component unit test', () => {
    let component: SpriteManagerToolbarComponent;
    let fixture: ComponentFixture<SpriteManagerToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpriteManagerToolbarComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SpriteManagerToolbarComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
