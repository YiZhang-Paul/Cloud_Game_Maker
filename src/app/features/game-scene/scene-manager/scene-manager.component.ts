import { Component } from '@angular/core';

import { Scene } from '../../../core/data-model/scene/scene';
import { MiniToolbarOption } from '../../../core/enum/mini-toolbar-option.enum';

@Component({
    selector: 'app-scene-manager',
    templateUrl: './scene-manager.component.html',
    styleUrls: ['./scene-manager.component.scss']
})
export class SceneManagerComponent {
    public toolbarOptions = [MiniToolbarOption.Create, MiniToolbarOption.Search];
    private _scenes: Scene[] = [];
    private _filteredScenes: Scene[] = [];

    get scenes(): Scene[] {
        return this._scenes;
    }

    get filteredScenes(): Scene[] {
        return this._filteredScenes;
    }

    public onSceneCreate(): void {
        this._scenes.push(new Scene());
        this._filteredScenes = this._scenes.slice();
    }

    public onFileSearch(keyword: string): void {
        const lowercase = keyword.toLowerCase();
        this._filteredScenes = this._scenes.filter(_ => _.name.toLowerCase().includes(lowercase));
    }
}
