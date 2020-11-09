import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { store } from '../store';
import { Scene } from '../../../core/data-model/scene/scene';
import { MiniToolbarOption } from '../../../core/enum/mini-toolbar-option.enum';
import { ConfirmPopupOption } from '../../../core/data-model/generic/options/confirm-popup-option';
import { ConfirmPopupComponent } from '../../../shared/components/popups/confirm-popup/confirm-popup.component';

@Component({
    selector: 'app-scene-manager',
    templateUrl: './scene-manager.component.html',
    styleUrls: ['./scene-manager.component.scss']
})
export class SceneManagerComponent implements OnInit {
    public toolbarOptions = [MiniToolbarOption.Create, MiniToolbarOption.Search];
    private _hasScenes$: Observable<boolean>;
    private _isSceneLoaded$: Observable<boolean>;
    private _filteredScenes$: Observable<Scene[]>;

    constructor(private _store: Store, private _dialog: MatDialog) { }

    get hasScenes$(): Observable<boolean> {
        return this._hasScenes$;
    }

    get isSceneLoaded$(): Observable<boolean> {
        return this._isSceneLoaded$;
    }

    get filteredScenes$(): Observable<Scene[]> {
        return this._filteredScenes$;
    }

    public ngOnInit(): void {
        this._store.dispatch(store.actions.startGetScenesRemote());
        this._hasScenes$ = this._store.select(store.selectors.hasScenes);
        this._isSceneLoaded$ = this._store.select(store.selectors.isSceneLoaded);
        this.onSceneSearch('');
    }

    public onSceneSearch(keyword: string): void {
        this._filteredScenes$ = this._store.select(store.selectors.getFilteredScenes, keyword);
    }

    public onSceneCreate(): void {
        this._store.dispatch(store.actions.addSceneRemote(new Scene()));
    }

    public onDelete(scene: Scene): void {
        const title = 'Are you sure?';
        const message = 'The scene will be permanently removed.';

        const dialog = this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message),
            width: '350px',
            height: '175px'
        });

        dialog.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this._store.dispatch(store.actions.deleteSceneRemote(scene));
            }
        });
    }
}
