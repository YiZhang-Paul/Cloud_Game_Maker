import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent {
    private _files: SpriteFile[] = [];
    private _isPreviewing = false;

    get files(): SpriteFile[] {
        return this._files;
    }

    get isPreviewing(): boolean {
        return this._isPreviewing;
    }

    public onFileImported(files: NgxFileDropEntry[]): void {
        console.log(files);
        this._isPreviewing = true;
    }
}
