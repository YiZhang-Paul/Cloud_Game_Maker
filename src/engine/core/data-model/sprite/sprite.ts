import { v4 as uuid } from 'uuid';
import { bindCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileSystemFileEntry } from 'ngx-file-drop';

export class Sprite {
    public originated: string;
    public id = uuid();
    public name: string;
    public content: Blob;
    public mime: string;
    public extension: string;
    public thumbnailUrl: string;

    public static isImported(file: Sprite): boolean {
        return file.id.includes('/');
    }

    public static fromSprite(file: Sprite, fromRemote = false): Sprite {
        const sprite = new Sprite();
        sprite.originated = fromRemote ? sprite.originated : file.id;
        sprite.id = fromRemote ? file.id : sprite.id;
        sprite.name = file.name;
        sprite.content = fromRemote ? sprite.content : file.content;
        sprite.mime = file.mime;
        sprite.extension = file.extension;
        sprite.thumbnailUrl = file.thumbnailUrl;

        return sprite;
    }

    public static fromFileEntry(file: FileSystemFileEntry): Observable<Sprite> {
        const callback = bindCallback(file.file);
        const sprite = new Sprite();
        sprite.name = file.name.replace(/\.[^.]*$/g, '');
        sprite.mime = 'image/jpeg';
        sprite.extension = 'jpg';

        return callback().pipe(map(content => ({ ...sprite, content })));
    }
}
