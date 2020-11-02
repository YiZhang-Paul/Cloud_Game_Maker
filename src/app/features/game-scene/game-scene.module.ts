import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
        StoreModule.forFeature(store.state.key, store.reducers.scenesReducer),
        EffectsModule.forFeature(Object.keys(store.effects).map(_ => store.effects[_]))
    ],
    exports: [
        SceneBuilderComponent,
        SceneManagerComponent
    ]
})
export class GameSceneModule { }
