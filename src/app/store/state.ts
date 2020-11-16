import { Point } from '../../engine/core/data-model/generic/point';
import { SpriteFile } from '../core/data-model/sprite/sprite-file';

export interface IAppImageSpritesState {
    draggedSprite: SpriteFile | null;
    draggedSpriteStartXY: Point | null;
}

export interface IAppState {
    appImageSpriteState: IAppImageSpritesState;
}

export const initialAppImageSpritesState: IAppImageSpritesState = {
    draggedSprite: null,
    draggedSpriteStartXY: null
};
