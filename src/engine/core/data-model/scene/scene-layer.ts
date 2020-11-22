import { SpriteFile } from '../sprite/sprite-file';

import { SceneGrid } from './scene-grid';

export class SceneLayer {
    public name = 'layer';
    public rows = 2000;
    public columns = 2000;
    public sprites: { [key: string]: SpriteFile } = {};
    public grids: { [key: string]: SceneGrid } = {};
}
