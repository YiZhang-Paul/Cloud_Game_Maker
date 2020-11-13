import { Point } from '../generic/point';

import { SceneLayer } from './scene-layer';

export class Scene {
    public id = '';
    public name = 'scene';
    public viewportXY = new Point();
    public layers: SceneLayer[] = null;
}
