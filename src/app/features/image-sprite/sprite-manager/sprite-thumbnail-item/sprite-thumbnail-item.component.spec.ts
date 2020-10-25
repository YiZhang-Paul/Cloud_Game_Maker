import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteThumbnailItemComponent } from './sprite-thumbnail-item.component';

describe('sprite thumbnail item component unit test', () => {
    let component: SpriteThumbnailItemComponent;
    let fixture: ComponentFixture<SpriteThumbnailItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpriteThumbnailItemComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SpriteThumbnailItemComponent);
        component = fixture.componentInstance;
    });

    test('should create component', () => {
        expect(component).toBeTruthy();
    });
});
