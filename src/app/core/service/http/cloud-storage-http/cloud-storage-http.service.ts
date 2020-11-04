import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { SpriteFile } from '../../../data-model/sprite/sprite-file';
import { Scene } from '../../../data-model/scene/scene';

@Injectable({
    providedIn: 'root'
})
export class CloudStorageHttpService {
    private readonly _api = `${environment.apiUrl}/api/cloud-storage`;

    constructor(private _http: HttpClient) { }

    public getScenes(): Observable<Scene[]> {
        return this._http.get<Scene[]>(`${this._api}/scenes`).pipe(catchError(() => of([])));
    }

    public addScene(scene: Scene): Observable<string> {
        const endpoint = `${this._api}/scenes`;
        const responseType = 'text';

        return this._http.post(endpoint, scene, { responseType }).pipe(catchError(() => of(null)));
    }

    public deleteScene(scene: Scene): Observable<boolean> {
        const endpoint = `${this._api}/scenes/${encodeURIComponent(scene.id)}`;

        return this._http.delete<boolean>(endpoint).pipe(catchError(() => of(false)));
    }

    public async getSprite(sprite: SpriteFile): Promise<SpriteFile> {
        try {
            const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.id)}`;
            const buffer = await this._http.get(endpoint, { responseType: 'arraybuffer' }).toPromise();
            sprite.content = new Blob([buffer], { type: sprite.mime });

            return sprite;
        }
        catch {
            return null;
        }
    }

    public getSprites(): Observable<SpriteFile[]> {
        const endpoint = `${this._api}/sprites`;

        return this._http.get<SpriteFile[]>(endpoint).pipe(
            mergeMap(sprites => of(sprites.map(_ => SpriteFile.fromSpriteFile(_, true)))),
            catchError(() => of([]))
        );
    }

    public addSprite(sprite: SpriteFile): Observable<string> {
        const endpoint = `${this._api}/sprites`;
        const data = new FormData();
        data.append('file', sprite.content);
        data.append('spriteJson', JSON.stringify(sprite));

        return this._http.post(endpoint, data, { responseType: 'text' }).pipe(catchError(() => of(null)));
    }

    public async updateSprite(sprite: SpriteFile): Promise<string> {
        try {
            const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.originated)}`;
            const data = new FormData();
            data.append('file', sprite.content);
            data.append('spriteJson', JSON.stringify(sprite));

            return await this._http.put(endpoint, data, { responseType: 'text' }).toPromise();
        }
        catch {
            return null;
        }
    }

    public deleteSprite(sprite: SpriteFile): Observable<boolean> {
        const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.id)}`;

        return this._http.delete<boolean>(endpoint).pipe(catchError(() => of(false)));
    }
}
