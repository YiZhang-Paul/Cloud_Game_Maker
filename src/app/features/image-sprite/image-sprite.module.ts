import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SpriteManagerComponent } from './sprite-manager/sprite-manager.component';
import { SpritePreviewerComponent } from './sprite-previewer/sprite-previewer.component';

@NgModule({
    declarations: [
        SpriteManagerComponent,
        SpritePreviewerComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [SpriteManagerComponent]
})
export class ImageSpriteModule { }
