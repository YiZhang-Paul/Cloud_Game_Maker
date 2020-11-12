import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

export const key = 'imageSprite';

export interface ISpritesState {
    sprites: SpriteFile[];
    hasFetchedSprites: boolean;
}

export interface IActiveSpriteState {
    activeSprite: SpriteFile | null;
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
