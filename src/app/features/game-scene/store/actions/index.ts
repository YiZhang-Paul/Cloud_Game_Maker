import * as sceneManagerActions from './scene-manager.actions';
import * as activeSceneActions from './active-scene.actions';

export const actions = {
    ...sceneManagerActions,
    ...activeSceneActions
};
