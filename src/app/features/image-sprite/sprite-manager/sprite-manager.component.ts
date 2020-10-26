import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { FileUtility } from '../../../core/utility/file.utility';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

@Component({
    selector: 'app-sprite-manager',
    templateUrl: './sprite-manager.component.html',
    styleUrls: ['./sprite-manager.component.scss']
})
export class SpriteManagerComponent {
    public previewing: SpriteFile;
    public editing: SpriteFile;
    private _files: SpriteFile[] = [];

    constructor(private _cloudStorageHttp: CloudStorageHttpService, private _snackbar: MatSnackBar) { }

    get files(): SpriteFile[] {
        return this._files;
    }

    public async onFilePreview(files: NgxFileDropEntry[]): Promise<void> {
        const file = files[0]?.fileEntry as FileSystemFileEntry;
        this.previewing = await SpriteFile.fromFileEntry(file);
    }

    public onFileEdit(file: SpriteFile, saveAsNew = false): void {
        const names = this._files.map(_ => _.name);
        this.editing = null;

        if (saveAsNew) {
            file.name = FileUtility.handleDuplicateName(names, file.name);
            this._files.push(file);

            return;
        }

        const index = this._files.findIndex(_ => _.id === file.originated);

        if (index !== -1) {
            const hasNewName = file.name !== this._files[index].name;
            file.name = hasNewName ? FileUtility.handleDuplicateName(names, file.name) : file.name;
            this._files[index] = file;
        }
    }

    public async onFileImport(): Promise<void> {
        if (!await this._cloudStorageHttp.addSprite(this.previewing)) {
            this._snackbar.open('Failed to import sprite file.', 'Ok');

            return;
        }

        this._files.push(this.previewing);
        this.previewing = null;
    }

    public onFileDelete(file: SpriteFile): void {
        this._files = this._files.filter(_ => _ !== file);
    }
}
