import { Component } from '@angular/core';

import { Scene } from './core/data-model/scene/scene';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public tools = ['Sprites', 'Scenes'];
    private _scenes: Scene[] = [];
    private _activeScene: Scene;

    get activeScene(): Scene {
        return this._activeScene;
    }

    public onCreateScene(): void {
        const scene = new Scene();
        this._scenes.push(scene);
        this._activeScene = scene;
    }
}
