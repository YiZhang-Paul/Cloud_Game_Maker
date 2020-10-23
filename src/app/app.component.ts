import { Component } from '@angular/core';

import { Scene } from './core/data-model/scene/scene';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _scenes: Scene[] = [];

    get scenes(): Scene[] {
        return this._scenes;
    }

    public onCreateScene(): void {
        this._scenes = [...this._scenes, new Scene()];
    }
}
