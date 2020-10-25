import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopToolbarComponent } from './top-toolbar.component';

describe('top toolbar component unit test', () => {
    let component: TopToolbarComponent;
    let fixture: ComponentFixture<TopToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TopToolbarComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(TopToolbarComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
