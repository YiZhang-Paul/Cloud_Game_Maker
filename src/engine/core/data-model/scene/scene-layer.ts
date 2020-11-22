import { SceneGrid } from './scene-grid';

export class SceneLayer {
    public name = 'layer';
    public rows = 2000;
    public columns = 2000;
    public grids: { [key: string]: SceneGrid } = {};
}