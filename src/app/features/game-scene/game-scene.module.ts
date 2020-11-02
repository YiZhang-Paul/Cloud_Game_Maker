import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { store } from './store';
import { SceneBuilderComponent } from './scene-builder/scene-builder.component';
import { SceneManagerComponent } from './scene-manager/scene-manager.component';

@NgModule({
    declarations: [
        SceneBuilderComponent,
        SceneManagerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(store.key, store.reducers)
    ],
    exports: [
        SceneBuilderComponent,
        SceneManagerComponent
    ]
})
export class GameSceneModule { }
