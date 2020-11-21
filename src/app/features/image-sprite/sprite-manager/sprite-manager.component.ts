import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

import { store } from '../store';
import { store as globalStore } from '../../../store';
import { Point } from '../../../../engine/core/data-model/generic/point';
import { SpriteFile } from '../../../../engine/core/data-model/sprite/sprite-file';
import { ConfirmActionOption } from '../../../core/data-model/options/confirm-action-option';
import { ConfirmPopupOption } from '../../../core/data-model/options/confirm-popup-option';
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
    public draggedSprite$: Observable<SpriteFile>;
    public draggedSpriteStartXY$: Observable<Point>;
    public hasFetchedSprites$: Observable<boolean>;
    public draggedSpriteStyle: { [key: string]: string };

    constructor(private _store: Store, private _dialog: MatDialog) { }

    public ngOnInit(): void {
        this._store.dispatch(store.actions.getSpritesRemote());
        this.allSprites$ = this._store.select(store.selectors.getAllSprites);
        this.onFileSearch('');
        this.activeSprite$ = this._store.select(store.selectors.getActiveSprite);
        this.draggedSprite$ = this._store.select(globalStore.selectors.getDraggedSprite);
        this.draggedSpriteStartXY$ = this._store.select(globalStore.selectors.getDraggedSpriteStartXY);
        this.hasFetchedSprites$ = this._store.select(store.selectors.hasFetchedSprites);
        this.draggedSpriteStartXY$.pipe(tap(point => this.setDraggedSpriteStyle(point)));
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMousemove({ clientX, clientY }: MouseEvent): void {
        this.setDraggedSpriteStyle(new Point(clientX, clientY));
    }

    private setDraggedSpriteStyle(point: Point): void {
        if (point) {
            this.draggedSpriteStyle = {
                top: `calc(${point.y}px - 7.5vh * 0.6)`,
                left: `calc(${point.x}px - 7.5vh * 0.6)`
            };
        }
        else {
            this.draggedSpriteStyle = null;
        }
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

    public onFileDragBegin(pointerXY: Point, file: SpriteFile): void {
        this._store.dispatch(globalStore.actions.setDraggedSpriteStartXY({ payload: pointerXY }));
        this._store.dispatch(globalStore.actions.setDraggedSprite({ payload: file }));
    }

    public onFileDragCancel(): void {
        this._store.dispatch(globalStore.actions.setDraggedSpriteStartXY({ payload: null }));
        this._store.dispatch(globalStore.actions.setDraggedSprite({ payload: null }));
    }

    private setActiveSprite(file: SpriteFile): void {
        this._store.dispatch(store.actions.setActiveSprite(file));
    }
}
