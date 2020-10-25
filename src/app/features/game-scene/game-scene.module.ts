import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SceneBuilderComponent } from './scene-builder/scene-builder.component';

@NgModule({
    declarations: [SceneBuilderComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [SceneBuilderComponent]
})
export class GameSceneModule { }
