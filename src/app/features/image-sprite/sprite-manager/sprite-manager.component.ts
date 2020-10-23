import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-manager',
    templateUrl: './sprite-manager.component.html',
    styleUrls: ['./sprite-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteManagerComponent {
    public previewing: SpriteFile;
    public editing: SpriteFile;
    private _files: SpriteFile[] = [];

    get files(): SpriteFile[] {
        return this._files;
    }

    public onFilePreview(files: NgxFileDropEntry[]): void {
        const file = files[0]?.fileEntry as FileSystemFileEntry;
        this.previewing = new SpriteFile(file);
    }

    public onFileImport(): void {
        this._files.push(this.previewing);
        this.previewing = null;
    }

    public onFileDelete(file: SpriteFile): void {
        this._files = this._files.filter(_ => _ !== file);
    }
}
