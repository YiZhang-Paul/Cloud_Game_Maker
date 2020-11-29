import { Sprite } from '../../../../engine/core/data-model/sprite/sprite';

export const key = 'imageSprite';

export interface ISpritesState {
    sprites: Sprite[];
    hasFetchedSprites: boolean;
}

export interface IActiveSpriteState {
    activeSprite: Sprite | null;
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
    activeSprite: null
};
