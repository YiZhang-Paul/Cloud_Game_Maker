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
    public allSprites$: Observable<SpriteFile[]>;
    public filteredSprites$: Observable<SpriteFile[]>;
    public activeSprite$: Observable<SpriteFile>;
    public hasFetchedSprites$: Observable<boolean>;

    constructor(private _store: Store) { }

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
