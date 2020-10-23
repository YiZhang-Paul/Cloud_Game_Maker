import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent {
    private _files: SpriteFile[] = [];

    get files(): SpriteFile[] {
        return this._files;
    }
}
