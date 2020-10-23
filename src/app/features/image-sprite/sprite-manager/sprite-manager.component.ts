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
    public previewed: FileSystemFileEntry;
    private _files: SpriteFile[] = [];

    get files(): SpriteFile[] {
        return this._files;
    }

    public onFilePreviewed(files: NgxFileDropEntry[]): void {
        this.previewed = files[0]?.fileEntry as FileSystemFileEntry;
    }

    public onFileImported(file: FileSystemFileEntry): void {
        this.previewed = null;
        this._files.push(new SpriteFile(file.name));
    }
}
