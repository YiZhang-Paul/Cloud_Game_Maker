import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopupComponent } from './confirm-popup.component';

describe('confirm popup component unit test', () => {
    let component: ConfirmPopupComponent;
    let fixture: ComponentFixture<ConfirmPopupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmPopupComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ConfirmPopupComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
