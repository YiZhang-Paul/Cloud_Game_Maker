import { FileSystemFileEntry } from 'ngx-file-drop';

import { FileUtility } from '../../utility/file.utility';

export class SpriteFile {
    public name: string;
    public type: string;
    public base64: string;

    get imageSrc(): string {
        return `data:${this.type};base64,${this.base64}`;
    }

    public static async fromFileEntry(file: FileSystemFileEntry): Promise<SpriteFile> {
        const sprite = new SpriteFile();
        const blob: Blob = await new Promise(resolve => file.file(resolve));
        sprite.base64 = await FileUtility.toBase64(blob);
        sprite.type = blob.type;
        sprite.name = file.name;

        return sprite;
    }
}
