import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextBoxEmbeddedComponent } from './editable-text-box-embedded.component';

describe('editable text box embedded component unit test', () => {
    let component: EditableTextBoxEmbeddedComponent;
    let fixture: ComponentFixture<EditableTextBoxEmbeddedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditableTextBoxEmbeddedComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EditableTextBoxEmbeddedComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
