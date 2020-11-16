import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

import { store } from '../store';
import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { ConfirmActionOption } from '../../../core/data-model/generic/options/confirm-action-option';
import { ConfirmPopupOption } from '../../../core/data-model/generic/options/confirm-popup-option';
import { ConfirmPopupComponent } from '../../../shared/components/popups/confirm-popup/confirm-popup.component';

@Component({
    selector: 'app-sprite-manager',
    templateUrl: './sprite-manager.component.html',
    styleUrls: ['./sprite-manager.component.scss']
})
export class SpriteManagerComponent implements OnInit {
    public allSprites$: Observable<SpriteFile[]>;
    public filteredSprites$: Observable<SpriteFile[]>;
    public activeSprite$: Observable<SpriteFile>;
    public hasFetchedSprites$: Observable<boolean>;

    constructor(private _store: Store, private _dialog: MatDialog) { }

    public ngOnInit(): void {
        this._store.dispatch(store.actions.getSpritesRemote());
        this.allSprites$ = this._store.select(store.selectors.getAllSprites);
        this.onFileSearch('');
        this.activeSprite$ = this._store.select(store.selectors.getActiveSprite);
        this.hasFetchedSprites$ = this._store.select(store.selectors.hasFetchedSprites);
    }

    public onFileSelect(files: NgxFileDropEntry[]): void {
        const file = files[0]?.fileEntry as FileSystemFileEntry;
        SpriteFile.fromFileEntry(file).subscribe(sprite => this.setActiveSprite(sprite));
    }

    public onFileSearch(keyword: string): void {
        this.filteredSprites$ = this._store.select(store.selectors.getFilteredSprites, keyword);
    }

    public onFileNameChange(name: string, file: SpriteFile): void {
        if (name?.trim()) {
            this._store.dispatch(store.actions.updateSpriteRemote({ ...file, name }));

            return;
        }

        const title = 'Invalid file name';
        const message = 'Please enter a non-empty file name.';
        const actions = [new ConfirmActionOption('Got It', null)];

        this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message, actions),
            width: '350px',
            height: '175px'
        });
    }

    public onFileEdit(file: SpriteFile, saveAsNew = false): void {
        if (saveAsNew) {
            this._store.dispatch(store.actions.addSpriteRemote(file));
        }
        else {
            this._store.dispatch(store.actions.updateSpriteRemote(file));
        }
    }

    public onFileDelete(file: SpriteFile): void {
        this._store.dispatch(store.actions.deleteSpriteRemote(file));
    }

    public onFileEditStart(file: SpriteFile): void {
        if (file.content) {
            this.setActiveSprite(file);
        }
        else {
            this._store.dispatch(store.actions.setActiveSpriteLazyLoad(file));
        }
    }

    public onFileEditCancel(): void {
        this._store.dispatch(store.actions.resetActiveSprite());
    }

    private setActiveSprite(file: SpriteFile): void {
        this._store.dispatch(store.actions.setActiveSprite(file));
    }
}
