import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent {
    private _files: SpriteFile[] = [];
    private _previewed: FileSystemFileEntry;

    get files(): SpriteFile[] {
        return this._files;
    }

    get previewed(): FileSystemFileEntry {
        return this._previewed;
    }

    public onFileImported(files: NgxFileDropEntry[]): void {
        this._previewed = files[0]?.fileEntry as FileSystemFileEntry;
    }
}
