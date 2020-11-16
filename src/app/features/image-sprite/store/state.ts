import { Point } from '../../../../engine/core/data-model/generic/point';
import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

export const key = 'imageSprite';

export interface ISpritesState {
    sprites: SpriteFile[];
    hasFetchedSprites: boolean;
}

export interface IActiveSpriteState {
    activeSprite: SpriteFile | null;
    draggedSprite: SpriteFile | null;
    draggedSpriteStartXY: Point | null;
}

export interface IImageSpriteState {
    spritesState: ISpritesState;
    activeSpriteState: IActiveSpriteState;
}

export const initialSpritesState: ISpritesState = {
    sprites: [],
    hasFetchedSprites: false
};

export const initialActiveSpriteState: IActiveSpriteState = {
    activeSprite: null,
    draggedSprite: null,
    draggedSpriteStartXY: null
};
