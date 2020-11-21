import { Action, createReducer, on } from '@ngrx/store';

import { ISpritesState, initialSpritesState } from '../state';
import { actions } from '../actions';
import { SpriteFile } from '../../../../../engine/core/data-model/sprite/sprite-file';

function addSprite(state: ISpritesState, sprite: SpriteFile): ISpritesState {
    return { ...state, sprites: [sprite, ...state.sprites] };
}

function updateSprite(state: ISpritesState, props: { payload: SpriteFile, index: number }): ISpritesState {
    const { payload, index } = props;
    const sprites = [...state.sprites.slice(0, index), payload, ...state.sprites.slice(index + 1)];

    return { ...state, sprites };
}

function deleteSprite(state: ISpritesState, sprite: SpriteFile): ISpritesState {
    return { ...state, sprites: state.sprites.filter(_ => _.id !== sprite.id) };
}

function setSprites(state: ISpritesState, props: { payload: SpriteFile[] }): ISpritesState {
    return { ...state, sprites: props.payload };
}

function setHasFetchedSprites(state: ISpritesState, props: { payload: boolean }): ISpritesState {
    return { ...state, hasFetchedSprites: props.payload };
}

const _spritesReducer = createReducer(
    initialSpritesState,
    on(actions.addSprite, addSprite),
    on(actions.updateSprite, updateSprite),
    on(actions.deleteSprite, deleteSprite),
    on(actions.setSprites, setSprites),
    on(actions.getSpritesRemote, _ => setHasFetchedSprites(_, { payload: false })),
    on(actions.setHasFetchedSprites, setHasFetchedSprites)
);

export function spritesReducer(state: ISpritesState, action: Action): ISpritesState {
    return _spritesReducer(state, action);
}
