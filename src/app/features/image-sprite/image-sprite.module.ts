import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SpriteManagerComponent } from './sprite-manager/sprite-manager.component';
import { SpriteThumbnailItemComponent } from './sprite-manager/sprite-thumbnail-item/sprite-thumbnail-item.component';
import { SpritePreviewerComponent } from './sprite-editor/sprite-previewer/sprite-previewer.component';
import { SpriteEditorComponent } from './sprite-editor/sprite-editor.component';

@NgModule({
    declarations: [
        SpriteManagerComponent,
        SpriteThumbnailItemComponent,
        SpritePreviewerComponent,
        SpriteEditorComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [SpriteManagerComponent]
})
export class ImageSpriteModule { }
