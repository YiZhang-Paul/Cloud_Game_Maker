import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import imageCompression from 'browser-image-compression';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { FileUtility } from '../../../core/utility/file.utility';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

@Component({
    selector: 'app-sprite-manager',
    templateUrl: './sprite-manager.component.html',
    styleUrls: ['./sprite-manager.component.scss']
})
export class SpriteManagerComponent implements OnInit {
    public previewing: SpriteFile;
    public editing: SpriteFile;
    private _files: SpriteFile[] = [];

    constructor(private _cloudStorageHttp: CloudStorageHttpService, private _snackbar: MatSnackBar) { }

    get files(): SpriteFile[] {
        return this._files;
    }

    public async ngOnInit(): Promise<void> {
        this._files = await this._cloudStorageHttp.getSprites();
    }

    public async onFilePreview(files: NgxFileDropEntry[]): Promise<void> {
        const file = files[0]?.fileEntry as FileSystemFileEntry;
        this.previewing = await SpriteFile.fromFileEntry(file);
    }

    public async onFileEdit(file: SpriteFile, saveAsNew = false): Promise<void> {
        let succeeded = false;

        if (saveAsNew) {
            succeeded = await this.addFile(file);
        }
        else {
            succeeded = await this.updateFile(file);
        }

        if (succeeded) {
            this.editing = null;
        }
    }

    public async onFileImport(): Promise<void> {
        if (await this.addFile(this.previewing)) {
            this.previewing = null;
        }
    }

    public async onFileDelete(file: SpriteFile): Promise<void> {
        if (!await this._cloudStorageHttp.deleteSprite(file)) {
            this._snackbar.open('Failed to delete sprite file.', 'Ok');

            return;
        }

        this._files = this._files.filter(_ => _ !== file);
    }

    private async addFile(file: SpriteFile): Promise<boolean> {
        const names = this._files.map(_ => _.name);
        const compressed = await imageCompression(file.content, { maxSizeMB: 0.2 });
        file.name = FileUtility.handleDuplicateName(names, file.name);
        file.content = new Blob([compressed], { type: compressed.type });
        const id = await this._cloudStorageHttp.addSprite(file);

        if (id) {
            file.id = id;
            this._files.unshift(file);
        }
        else {
            this._snackbar.open('Failed to add sprite file.', 'Ok');
        }

        return Boolean(id);
    }

    private async updateFile(file: SpriteFile): Promise<boolean> {
        const index = this._files.findIndex(_ => _.id === file.originated);

        if (index === -1) {
            return false;
        }

        const names = this._files.map(_ => _.name);
        const hasNewName = file.name !== this._files[index].name;
        file.name = hasNewName ? FileUtility.handleDuplicateName(names, file.name) : file.name;
        const id = await this._cloudStorageHttp.updateSprite(file);

        if (id) {
            file.id = id;
            this._files[index] = file;
        }
        else {
            this._snackbar.open('Failed to update sprite file.', 'Ok');
        }

        return Boolean(id);
    }
}
