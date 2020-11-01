import { Component } from '@angular/core';

import { Scene } from '../../../core/data-model/scene/scene';

@Component({
    selector: 'app-scene-manager',
    templateUrl: './scene-manager.component.html',
    styleUrls: ['./scene-manager.component.scss']
})
export class SceneManagerComponent {
    private _scenes: Scene[] = [];

    get scenes(): Scene[] {
        return this._scenes;
    }

    public onSceneCreate(): void {
        this._scenes.push(new Scene());
    }
}
