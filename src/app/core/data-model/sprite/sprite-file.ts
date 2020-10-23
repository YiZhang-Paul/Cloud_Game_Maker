import { FileSystemFileEntry } from 'ngx-file-drop';

export class SpriteFile {
    public raw: FileSystemFileEntry;
    public name: string;

    constructor(raw: FileSystemFileEntry, name = '') {
        this.raw = raw;
        this.name = name || raw.name;
    }
}
