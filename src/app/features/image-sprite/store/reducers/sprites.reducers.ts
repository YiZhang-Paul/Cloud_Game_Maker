import { Action, createReducer, on } from '@ngrx/store';

import { ISpritesState, initialSpritesState } from '../state';
import { actions } from '../actions';
import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';
import { GenericUtility } from '../../../../core/utility/generic-utility/generic.utility';

function addSprite(state: ISpritesState, sprite: Sprite): ISpritesState {
    return { ...state, sprites: [sprite, ...state.sprites] };
}

function updateSprite(state: ISpritesState, sprite: Sprite): ISpritesState {
    const index = state.sprites.findIndex(_ => _.id === sprite.id);

    return index === -1 ? state : updateSpriteByIndex(state, { payload: sprite, index });
}

function updateSpriteByIndex(state: ISpritesState, props: { payload: Sprite, index: number }): ISpritesState {
    const { payload, index } = props;

    return { ...state, sprites: GenericUtility.replaceAt(state.sprites, payload, index) };
}

function deleteSprite(state: ISpritesState, sprite: Sprite): ISpritesState {
    return { ...state, sprites: state.sprites.filter(_ => _.id !== sprite.id) };
}

function setSprites(state: ISpritesState, props: { payload: Sprite[] }): ISpritesState {
    return { ...state, sprites: props.payload };
}

function setHasFetchedSprites(state: ISpritesState, props: { payload: boolean }): ISpritesState {
    return { ...state, hasFetchedSprites: props.payload };
}

const _spritesReducer = createReducer(
    initialSpritesState,
    on(actions.addSprite, addSprite),
    on(actions.updateSprite, updateSprite),
    on(actions.updateSpriteByIndex, updateSpriteByIndex),
    on(actions.deleteSprite, deleteSprite),
    on(actions.setSprites, setSprites),
    on(actions.getSpritesRemote, _ => setHasFetchedSprites(_, { payload: false })),
    on(actions.setHasFetchedSprites, setHasFetchedSprites)
);

export function spritesReducer(state: ISpritesState, action: Action): ISpritesState {
    return _spritesReducer(state, action);
}
