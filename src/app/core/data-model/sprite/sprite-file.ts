import { v4 as uuid } from 'uuid';
import { FileSystemFileEntry } from 'ngx-file-drop';

export class SpriteFile {
    public originated: string;
    public id: string = uuid();
    public name: string;
    public content: Blob;
    public mime: string;
    public extension: string;
    public thumbnailUrl: string;

    get isImported(): boolean {
        return this.id.includes('/');
    }

    public static fromSpriteFile(file: SpriteFile, fromRemote = false): SpriteFile {
        const sprite = new SpriteFile();
        sprite.originated = fromRemote ? sprite.originated : file.id;
        sprite.id = fromRemote ? file.id : sprite.id;
        sprite.name = file.name;
        sprite.content = fromRemote ? sprite.content : file.content;
        sprite.mime = file.mime;
        sprite.extension = file.extension;
        sprite.thumbnailUrl = file.thumbnailUrl;

        return sprite;
    }

    public static async fromFileEntry(file: FileSystemFileEntry): Promise<SpriteFile> {
        const sprite = new SpriteFile();
        sprite.name = file.name.replace(/\.[^.]*$/g, '');
        sprite.content = await new Promise(resolve => file.file(resolve));
        sprite.mime = sprite.content.type;
        sprite.extension = sprite.content.type.includes('png') ? 'png' : 'jpg';

        return sprite;
    }
}
