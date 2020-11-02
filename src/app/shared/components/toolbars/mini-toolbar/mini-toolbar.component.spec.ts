import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniToolbarComponent } from './mini-toolbar.component';

describe('mini toolbar component unit test', () => {
    let component: MiniToolbarComponent;
    let fixture: ComponentFixture<MiniToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MiniToolbarComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(MiniToolbarComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
