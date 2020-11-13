import { SceneGrid } from './scene-grid';

export class SceneLayer {
    public grids = SceneLayer.createGrids(20, 20);

    public static createGrids(x: number, y: number): SceneGrid[][] {
        return new Array(y).fill(0).map(() => new Array(x).fill(0).map(() => new SceneGrid()));
    }
}
