import { v4 as uuid } from 'uuid';
import { FileSystemFileEntry } from 'ngx-file-drop';

import { FileUtility } from '../../utility/file.utility';

export class SpriteFile {
    public originated: string;
    public id: string = uuid();
    public name: string;
    public type: string;
    public extension: string;
    public base64: string;

    get imageSrc(): string {
        return `data:${this.type};base64,${this.base64}`;
    }

    public static fromSpriteFile(file: SpriteFile): SpriteFile {
        const sprite = new SpriteFile();
        sprite.originated = file.id;
        sprite.name = file.name;
        sprite.parseImageSrc(file.imageSrc);

        return sprite;
    }

    public static async fromFileEntry(file: FileSystemFileEntry): Promise<SpriteFile> {
        const blob: Blob = await new Promise(resolve => file.file(resolve));
        const sprite = new SpriteFile();
        sprite.name = file.name.replace(/\.[^.]*$/g, '');
        sprite.type = blob.type;
        sprite.extension = sprite.type.includes('png') ? 'png' : 'jpg';
        sprite.base64 = await FileUtility.toBase64(blob);

        return sprite;
    }

    public parseImageSrc(src: string): void {
        this.type = src.split(',')[0].replace(/data:|;base64/g, '');
        this.extension = this.type.includes('png') ? 'png' : 'jpg';
        this.base64 = src.split(',')[1];
    }
}
