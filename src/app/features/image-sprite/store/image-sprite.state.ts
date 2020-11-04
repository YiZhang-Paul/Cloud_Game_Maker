import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

export const key = 'imageSprite';

export interface IImageSpriteState {
    sprites: SpriteFile[];
    isSpriteLoaded: boolean;
}

export const initialState: IImageSpriteState = {
    sprites: [],
    isSpriteLoaded: true
};
