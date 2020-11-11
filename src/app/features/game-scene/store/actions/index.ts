import * as scenesActions from './scenes.actions';
import * as activeSceneActions from './active-scene.actions';

export const actions = {
    ...scenesActions,
    ...activeSceneActions
};
