import { DatabaseRecord } from '../database-record';

export class SceneDescriptor extends DatabaseRecord {
    public storageId: string;
    public name: string;

    constructor(storageId: string, name: string) {
        super();
        this.storageId = storageId;
        this.name = name;
    }
}
