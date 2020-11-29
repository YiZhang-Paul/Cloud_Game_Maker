import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import { store } from './store';
import { SceneBuilderComponent } from './scene-builder/scene-builder.component';
import { SceneManagerComponent } from './scene-manager/scene-manager.component';
import { SceneViewportComponent } from './scene-builder/scene-viewport/scene-viewport.component';
import { SceneToolTogglesComponent } from './scene-builder/scene-tool-toggles/scene-tool-toggles.component';
import { SceneLayerToolComponent } from './scene-builder/scene-layer-tool/scene-layer-tool.component';

@NgModule({
    declarations: [
        SceneBuilderComponent,
        SceneManagerComponent,
        SceneViewportComponent,
        SceneToolTogglesComponent,
        SceneLayerToolComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(store.state.key, store.reducers),
        EffectsModule.forFeature(store.effects)
    ],
    exports: [
        SceneBuilderComponent,
        SceneManagerComponent
    ]
})
export class GameSceneModule { }
