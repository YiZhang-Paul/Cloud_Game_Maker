import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameSceneModule } from './game-scene/game-scene.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        GameSceneModule
    ],
    exports: [
        GameSceneModule
    ]
})
export class FeaturesModule { }
