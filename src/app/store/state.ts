import { Point } from '../../engine/core/data-model/generic/point';
import { Sprite } from '../../engine/core/data-model/sprite/sprite';

export interface IAppImageSpritesState {
    draggedSprite: Sprite | null;
    draggedSpriteStartXY: Point | null;
}

export interface IAppState {
    appImageSpriteState: IAppImageSpritesState;
}

export const initialAppImageSpritesState: IAppImageSpritesState = {
    draggedSprite: null,
    draggedSpriteStartXY: null
};
