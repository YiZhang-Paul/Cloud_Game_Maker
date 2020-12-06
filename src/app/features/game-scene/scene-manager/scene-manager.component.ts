import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { store } from '../store';
import { Scene } from '../../../../engine/core/data-model/scene/scene';
import { SceneLayer } from '../../../../engine/core/data-model/scene/scene-layer';
import { SceneDescriptor } from '../../../core/data-model/descriptors/scene-descriptor';
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
    public allDescriptors$: Observable<SceneDescriptor[]>;
    public filteredDescriptors$: Observable<SceneDescriptor[]>;
    public hasFetchedDescriptors$: Observable<boolean>;
    public canAddScene$: Observable<boolean>;
    public toolbarOptions$: Observable<ToolbarActionOption[]>;

    constructor(private _store: Store, private _dialog: MatDialog) { }

    public ngOnInit(): void {
        this._store.dispatch(store.actions.getDescriptorsRemote());
        this.allDescriptors$ = this._store.select(store.selectors.getAllDescriptors);
        this.onSceneSearch('');
        this.hasFetchedDescriptors$ = this._store.select(store.selectors.hasFetchedDescriptors);
        this.canAddScene$ = this._store.select(store.selectors.canAddScene);

        this.toolbarOptions$ = this.canAddScene$.pipe(
            map(_ => [
                new ToolbarActionOption(MiniToolbarOption.Create, !_),
                new ToolbarActionOption(MiniToolbarOption.Search)
            ])
        );
    }

    public onSceneSearch(keyword: string): void {
        this.filteredDescriptors$ = this._store.select(store.selectors.getFilteredDescriptors, keyword);
    }

    public onSceneCreate(): void {
        const layers: SceneLayer[] = [{ ...new SceneLayer(), isActive: true }];
        const scene: Scene = { ...new Scene(), layers };
        this._store.dispatch(store.actions.addSceneRemote(scene));
    }

    public onSceneOpen(descriptor: SceneDescriptor): void {
        this._store.dispatch(store.actions.openScene(descriptor));
    }

    public onDelete(descriptor: SceneDescriptor): void {
        const title = 'Are you sure?';
        const message = 'The scene will be permanently removed.';

        const dialog = this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message),
            width: '350px',
            height: '175px'
        });

        dialog.afterClosed().subscribe(_ => {
            if (_) {
                this._store.dispatch(store.actions.deleteSceneRemote(descriptor));
            }
        });
    }
}
