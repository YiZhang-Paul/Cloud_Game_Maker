import { Point } from '../../data-model/generic/point';

import { SceneLayer } from './scene-layer';

export class Scene {
    public storageId = '';
    public name = 'scene';
    public scale = 100;
    public viewportXY = new Point();
    public layers: SceneLayer[] = null;
}
