import { Component, OnInit } from '@angular/core';

import { Scene } from '../../../core/data-model/scene/scene';
import { MiniToolbarOption } from '../../../core/enum/mini-toolbar-option.enum';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';
import { FileUtility } from '../../../core/utility/file.utility';

@Component({
    selector: 'app-scene-manager',
    templateUrl: './scene-manager.component.html',
    styleUrls: ['./scene-manager.component.scss']
})
export class SceneManagerComponent implements OnInit {
    public toolbarOptions = [MiniToolbarOption.Create, MiniToolbarOption.Search];
    public filter = '';
    private _isLoaded = false;
    private _scenes: Scene[] = [];

    constructor(private _cloudStorageHttp: CloudStorageHttpService) { }

    get isLoaded(): boolean {
        return this._isLoaded;
    }

    get scenes(): Scene[] {
        return this._scenes;
    }

    get filteredScenes(): Scene[] {
        return this._scenes.filter(_ => _.name.toLowerCase().includes(this.filter ?? ''));
    }

    public async ngOnInit(): Promise<void> {
        this._scenes = await this._cloudStorageHttp.getScenes();
        this._isLoaded = true;
    }

    public async onSceneCreate(): Promise<void> {
        const scene = new Scene();
        const names = this._scenes.map(_ => _.name);
        scene.name = FileUtility.handleDuplicateName(names, scene.name, '_', '');
        scene.id = await this._cloudStorageHttp.addScene(scene);

        if (scene.id) {
            this._scenes.push(scene);
        }
    }
}
