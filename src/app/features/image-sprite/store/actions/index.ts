import * as spritesActions from './sprites.actions';
import * as activeSpriteActions from './active-sprite.actions';

export const actions = {
    ...spritesActions,
    ...activeSpriteActions
};
