import { Point } from '../../data-model/generic/point';
import { Sprite } from '../sprite/sprite';

import { SceneLayer } from './scene-layer';

export class Scene {
    public storageKey = '';
    public name = 'scene';
    public scale = 100;
    public viewportXY = new Point();
    public sprites: { [key: string]: Sprite } = {};
    public layers: SceneLayer[] = null;
}
