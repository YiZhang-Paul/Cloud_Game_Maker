import { FileSystemFileEntry } from 'ngx-file-drop';

import { FileUtility } from '../../utility/file.utility';

export class SpriteFile {
    public name: string;
    public type: string;
    public extension: string;
    public base64: string;

    get imageSrc(): string {
        return `data:${this.type};base64,${this.base64}`;
    }

    public static fromBase64(name: string, base64: string): SpriteFile {
        if (!base64.includes(',')) {
            throw new Error('Missing type information in provided base64 string.');
        }

        const sprite = new SpriteFile();
        sprite.name = name.replace(/\.[^.]*$/g, '');
        sprite.type = base64.split(',')[0].replace(/data:|;base64/g, '');
        sprite.extension = sprite.type.includes('png') ? 'png' : 'jpg';
        sprite.base64 = base64.split(',')[1];

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
}
