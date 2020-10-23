import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SpriteEditorComponent } from './sprite-editor/sprite-editor.component';
import { SpritePreviewerComponent } from './sprite-previewer/sprite-previewer.component';

@NgModule({
    declarations: [
        SpriteEditorComponent,
        SpritePreviewerComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [SpriteEditorComponent]
})
export class ImageSpriteModule { }
