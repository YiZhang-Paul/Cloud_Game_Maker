import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SpriteEditorComponent } from './sprite-editor/sprite-editor.component';

@NgModule({
    declarations: [SpriteEditorComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [SpriteEditorComponent]
})
export class ImageSpriteModule { }
