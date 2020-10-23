import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageSpriteModule } from './image-sprite/image-sprite.module';
import { GameSceneModule } from './game-scene/game-scene.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ImageSpriteModule,
        GameSceneModule
    ],
    exports: [
        ImageSpriteModule,
        GameSceneModule
    ]
})
export class FeaturesModule { }
