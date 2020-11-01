import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SceneBuilderComponent } from './scene-builder/scene-builder.component';
import { SceneManagerComponent } from './scene-manager/scene-manager.component';

@NgModule({
    declarations: [
        SceneBuilderComponent,
        SceneManagerComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        SceneBuilderComponent,
        SceneManagerComponent
    ]
})
export class GameSceneModule { }
