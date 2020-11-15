import { Point } from '../generic/point';

import { SceneLayer } from './scene-layer';

export class Scene {
    public id = '';
    public name = 'scene';
    public scale = 100;
    public viewportXY = new Point();
    public layers: SceneLayer[] = null;
}
