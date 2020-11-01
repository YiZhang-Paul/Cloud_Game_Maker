import { Component } from '@angular/core';

import { Scene } from '../../../core/data-model/scene/scene';
import { MiniToolbarOption } from '../../../core/enum/mini-toolbar-option.enum';
import { FileUtility } from '../../../core/utility/file.utility';

@Component({
    selector: 'app-scene-manager',
    templateUrl: './scene-manager.component.html',
    styleUrls: ['./scene-manager.component.scss']
})
export class SceneManagerComponent {
    public toolbarOptions = [MiniToolbarOption.Create, MiniToolbarOption.Search];
    private _scenes: Scene[] = [];
    public filter = '';

    get scenes(): Scene[] {
        return this._scenes;
    }

    get filteredScenes(): Scene[] {
        return this._scenes.filter(_ => _.name.toLowerCase().includes(this.filter ?? ''));
    }

    public onSceneCreate(): void {
        const scene = new Scene();
        const names = this._scenes.map(_ => _.name);
        scene.name = FileUtility.handleDuplicateName(names, scene.name, '_', '');
        this._scenes.push(scene);
    }
}
