import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

import { store } from '../store';
import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-manager',
    templateUrl: './sprite-manager.component.html',
    styleUrls: ['./sprite-manager.component.scss']
})
export class SpriteManagerComponent implements OnInit {
    private _hasSprites$: Observable<boolean>;
    private _isSpriteLoaded$: Observable<boolean>;
    private _filteredSprites$: Observable<SpriteFile[]>;
    private _activeSprite$: Observable<SpriteFile>;

    constructor(private _store: Store) { }

    get hasSprites$(): Observable<boolean> {
        return this._hasSprites$;
    }

    get isSpriteLoaded$(): Observable<boolean> {
        return this._isSpriteLoaded$;
    }

    get filteredSprites$(): Observable<SpriteFile[]> {
        return this._filteredSprites$;
    }

    get activeSprite$(): Observable<SpriteFile> {
        return this._activeSprite$;
    }

    public ngOnInit(): void {
        this._store.dispatch(store.actions.startGetSpritesRemote());
        this._hasSprites$ = this._store.select(store.selectors.hasSprites);
        this._isSpriteLoaded$ = this._store.select(store.selectors.isSpriteLoaded);
        this._activeSprite$ = this._store.select(store.selectors.getActiveSprite);
        this.onFileSearch('');
    }

    public async onFileSelect(files: NgxFileDropEntry[]): Promise<void> {
        const file = files[0]?.fileEntry as FileSystemFileEntry;
        this.setActiveSprite(await SpriteFile.fromFileEntry(file));
    }

    public onFileSearch(keyword: string): void {
        this._filteredSprites$ = this._store.select(store.selectors.getFilteredSprites, keyword);
    }

    public onFileEdit(file: SpriteFile, saveAsNew = false): void {
        this._store.dispatch(store.actions.editSpriteRemote({ payload: file, isNew: saveAsNew }));
    }

    public onFileDelete(file: SpriteFile): void {
        this._store.dispatch(store.actions.deleteSpriteRemote(file));
    }

    public setActiveSprite(file: SpriteFile): void {
        this._store.dispatch(store.actions.setActiveSprite(file));
    }
}
