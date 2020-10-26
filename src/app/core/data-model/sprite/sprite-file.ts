import { v4 as uuid } from 'uuid';
import { FileSystemFileEntry } from 'ngx-file-drop';

import { FileUtility } from '../../utility/file.utility';

export class SpriteFile {
    public originated: string;
    public id: string = uuid();
    public name: string;
    public content: Blob;
    public mime: string;
    public extension: string;
    public base64: string;

    get imageSrc(): string {
        return `data:${this.mime};base64,${this.base64}`;
    }

    public static fromSpriteFile(file: SpriteFile, fromRemote = false): SpriteFile {
        const sprite = new SpriteFile();
        sprite.originated = fromRemote ? sprite.originated : file.id;
        sprite.id = fromRemote ? file.id : sprite.id;
        sprite.name = file.name;
        sprite.content = new Blob([sprite.content]);
        sprite.mime = file.mime;
        sprite.extension = file.extension;
        sprite.base64 = file.base64;

        if (file.imageSrc) {
            sprite.parseImageSrc(file.imageSrc);
        }

        return sprite;
    }

    public static async fromFileEntry(file: FileSystemFileEntry): Promise<SpriteFile> {
        const sprite = new SpriteFile();
        sprite.name = file.name.replace(/\.[^.]*$/g, '');
        sprite.content = await new Promise(resolve => file.file(resolve));
        sprite.mime = sprite.content.type;
        sprite.extension = sprite.mime.includes('png') ? 'png' : 'jpg';
        sprite.base64 = await FileUtility.toBase64(sprite.content);

        return sprite;
    }

    public parseImageSrc(src: string): void {
        this.mime = src.split(',')[0].replace(/data:|;base64/g, '');
        this.extension = this.mime.includes('png') ? 'png' : 'jpg';
        this.base64 = src.split(',')[1];
    }
}
