import { Action, createReducer, on } from '@ngrx/store';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

import { IImageSpriteState, initialState } from './image-sprite.state';
import * as actions from './image-sprite.actions';

function setActiveSprite(state: IImageSpriteState, sprite: SpriteFile): IImageSpriteState {
    return { ...state, activeSprite: sprite };
}

function resetActiveSprite(state: IImageSpriteState): IImageSpriteState {
    return { ...state, activeSprite: null };
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

function setSprites(state: IImageSpriteState, props: { payload: SpriteFile[] }): IImageSpriteState {
    return { ...state, sprites: props.payload };
}

function setIsSpriteLoaded(state: IImageSpriteState, props: { payload: boolean }): IImageSpriteState {
    return { ...state, isSpriteLoaded: props.payload };
}

const _spritesReducer = createReducer(
    initialState,
    on(actions.setActiveSprite, setActiveSprite),
    on(actions.resetActiveSprite, resetActiveSprite),
    on(actions.addSprite, addSprite),
    on(actions.updateSprite, updateSprite),
    on(actions.deleteSprite, deleteSprite),
    on(actions.setSprites, setSprites),
    on(actions.setIsSpriteLoaded, setIsSpriteLoaded)
);

export function spritesReducer(state: IImageSpriteState, action: Action): IImageSpriteState {
    return _spritesReducer(state, action);
}
