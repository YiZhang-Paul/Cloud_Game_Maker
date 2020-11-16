import { IAppState } from './state';

export const getDraggedSprite = (state: IAppState) => state.appImageSpriteState.draggedSprite;
export const getDraggedSpriteStartXY = (state: IAppState) => state.appImageSpriteState.draggedSpriteStartXY;
