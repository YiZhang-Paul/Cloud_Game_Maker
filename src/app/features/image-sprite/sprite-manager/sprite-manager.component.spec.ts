import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteManagerComponent } from './sprite-manager.component';

describe('sprite manager component unit test', () => {
    let component: SpriteManagerComponent;
    let fixture: ComponentFixture<SpriteManagerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpriteManagerComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SpriteManagerComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
