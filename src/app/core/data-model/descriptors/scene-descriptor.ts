import { DatabaseRecord } from '../database-record';

export class SceneDescriptor extends DatabaseRecord {
    public storageKey: string;
    public name: string;

    constructor(id: string, storageKey: string, name: string) {
        super(id);
        this.storageKey = storageKey;
        this.name = name;
    }
}
