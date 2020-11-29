import { DatabaseRecord } from '../database-record';

export class SceneDescriptor extends DatabaseRecord {
    public storageKey: string;
    public name: string;

    constructor(storageKey: string, name: string) {
        super();
        this.storageKey = storageKey;
        this.name = name;
    }
}
