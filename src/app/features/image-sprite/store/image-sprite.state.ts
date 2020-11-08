import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

export const key = 'imageSprite';

export interface IImageSpriteState {
    sprites: SpriteFile[];
    activeSprite: SpriteFile | null;
    isSpriteLoaded: boolean;
}

export const initialState: IImageSpriteState = {
    sprites: [],
    activeSprite: null,
    isSpriteLoaded: true
};
