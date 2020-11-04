import { Action, createReducer, on } from '@ngrx/store';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

import { IImageSpriteState, initialState } from './image-sprite.state';
import * as actions from './image-sprite.actions';

function addSprites(state: IImageSpriteState, props: { payload: SpriteFile[] }): IImageSpriteState {
    return { ...state, sprites: [...state.sprites, ...props.payload] };
}

function addSprite(state: IImageSpriteState, sprite: SpriteFile): IImageSpriteState {
    return { ...state, sprites: [sprite, ...state.sprites] };
}

function updateSprite(state: IImageSpriteState, props: { payload: SpriteFile, index: number }): IImageSpriteState {
    const { payload, index } = props;
    const sprites = [...state.sprites.slice(0, index), payload, ...state.sprites.slice(index + 1)];

    return { ...state, sprites };
}

function deleteSprite(state: IImageSpriteState, sprite: SpriteFile): IImageSpriteState {
    return { ...state, sprites: state.sprites.filter(_ => _.id !== sprite.id) };
}

function toggleIsSpriteLoaded(state: IImageSpriteState): IImageSpriteState {
    return { ...state, isSpriteLoaded: !state.isSpriteLoaded };
}

const _spritesReducer = createReducer(
    initialState,
    on(actions.addSprites, addSprites),
    on(actions.addSprite, addSprite),
    on(actions.updateSprite, updateSprite),
    on(actions.deleteSprite, deleteSprite),
    on(actions.toggleIsSpriteLoaded, toggleIsSpriteLoaded)
);

export function spritesReducer(state: IImageSpriteState, action: Action): IImageSpriteState {
    return _spritesReducer(state, action);
}
