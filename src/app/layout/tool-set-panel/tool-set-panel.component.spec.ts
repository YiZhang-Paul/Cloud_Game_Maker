import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSetPanelComponent } from './tool-set-panel.component';

describe('tool set panel component unit test', () => {
    let component: ToolSetPanelComponent;
    let fixture: ComponentFixture<ToolSetPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolSetPanelComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ToolSetPanelComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
