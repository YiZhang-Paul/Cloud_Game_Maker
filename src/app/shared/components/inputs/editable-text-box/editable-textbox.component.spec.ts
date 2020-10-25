import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextBoxComponent } from './editable-text-box.component';

describe('editable text box component unit test', () => {
    let component: EditableTextBoxComponent;
    let fixture: ComponentFixture<EditableTextBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditableTextBoxComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EditableTextBoxComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
