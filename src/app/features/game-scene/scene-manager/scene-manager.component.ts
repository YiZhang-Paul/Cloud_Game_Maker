import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { store } from '../store';
import { Scene } from '../../../../engine/core/data-model/scene/scene';
import { SceneLayer } from '../../../../engine/core/data-model/scene/scene-layer';
import { MiniToolbarOption } from '../../../core/enum/mini-toolbar-option.enum';
import { ToolbarActionOption } from '../../../core/data-model/options/toolbar-action-option';
import { ConfirmPopupOption } from '../../../core/data-model/options/confirm-popup-option';
import { ConfirmPopupComponent } from '../../../shared/components/popups/confirm-popup/confirm-popup.component';

@Component({
    selector: 'app-scene-manager',
    templateUrl: './scene-manager.component.html',
    styleUrls: ['./scene-manager.component.scss']
})
export class SceneManagerComponent implements OnInit {
    public allScenes$: Observable<Scene[]>;
    public filteredScenes$: Observable<Scene[]>;
    public hasFetchedScenes$: Observable<boolean>;
    public canAddScene$: Observable<boolean>;
    public toolbarOptions$: Observable<ToolbarActionOption[]>;

    constructor(private _store: Store, private _dialog: MatDialog) { }

    public ngOnInit(): void {
        this._store.dispatch(store.actions.getScenesRemote());
        this.allScenes$ = this._store.select(store.selectors.getAllScenes);
        this.onSceneSearch('');
        this.hasFetchedScenes$ = this._store.select(store.selectors.hasFetchedScenes);
        this.canAddScene$ = this._store.select(store.selectors.canAddScene);

        this.toolbarOptions$ = this.canAddScene$.pipe(
            map(_ => [
                new ToolbarActionOption(MiniToolbarOption.Create, !_),
                new ToolbarActionOption(MiniToolbarOption.Search)
            ])
        );
    }

    public onSceneSearch(keyword: string): void {
        this.filteredScenes$ = this._store.select(store.selectors.getFilteredScenes, keyword);
    }

    public onSceneCreate(): void {
        const layers = [new SceneLayer()];
        const scene: Scene = { ...new Scene(), layers };
        this._store.dispatch(store.actions.addSceneRemote(scene));
    }

    public onSceneOpen(scene: Scene): void {
        this._store.dispatch(store.actions.openScene(scene));
    }

    public onDelete(scene: Scene): void {
        const title = 'Are you sure?';
        const message = 'The scene will be permanently removed.';

        const dialog = this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message),
            width: '350px',
            height: '175px'
        });

        dialog.afterClosed().subscribe(_ => {
            if (_) {
                this._store.dispatch(store.actions.deleteSceneRemote(scene));
            }
        });
    }
}
