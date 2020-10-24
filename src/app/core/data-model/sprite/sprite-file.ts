import { FileSystemFileEntry } from 'ngx-file-drop';

export class SpriteFile {
    public raw: FileSystemFileEntry;
    public name: string;
    public type: string;
    public base64: string;

    constructor(raw: FileSystemFileEntry, name = '') {
        this.raw = raw;
        this.name = name || raw.name;
    }
}
