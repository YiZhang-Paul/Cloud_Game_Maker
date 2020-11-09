export class Scene {
    public id = '';
    public name = 'scene';

    public setId(id: string): Scene {
        this.id = id;

        return this;
    }
}
