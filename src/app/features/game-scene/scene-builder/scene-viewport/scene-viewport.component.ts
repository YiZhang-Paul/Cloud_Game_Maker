import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Scene } from '../../../../core/data-model/scene/scene';

@Component({
    selector: 'app-scene-viewport',
    templateUrl: './scene-viewport.component.html',
    styleUrls: ['./scene-viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneViewportComponent {
    @Input() public scene: Scene;
    @ViewChild('viewport') private _viewport: ElementRef;
    private _x = 0;
    private _y = 0;

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}
