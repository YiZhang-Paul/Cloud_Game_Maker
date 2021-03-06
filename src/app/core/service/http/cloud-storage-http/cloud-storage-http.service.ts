import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';

@Injectable({
    providedIn: 'root'
})
export class CloudStorageHttpService {
    private readonly _api = `${environment.apiUrl}/api/v1/cloud-storage`;

    constructor(private _http: HttpClient) { }

    public getSpriteContent(sprite: Sprite): Observable<Blob> {
        const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.id)}`;

        return this._http.get(endpoint, { responseType: 'arraybuffer' }).pipe(
            mergeMap(buffer => of(new Blob([buffer], { type: sprite.mime }))),
            catchError(() => of(null))
        );
    }

    public getSprites(): Observable<Sprite[]> {
        const endpoint = `${this._api}/sprites`;

        return this._http.get<Sprite[]>(endpoint).pipe(
            mergeMap(sprites => of(sprites.map(_ => Sprite.fromSprite(_, true)))),
            catchError(() => of([]))
        );
    }

    public addSprite(sprite: Sprite): Observable<Sprite> {
        const endpoint = `${this._api}/sprites`;
        const data = new FormData();
        data.append('file', sprite.content);
        data.append('spriteJson', JSON.stringify(sprite));

        return this._http.post<Sprite>(endpoint, data).pipe(catchError(() => of(null)));
    }

    public updateSprite(sprite: Sprite): Observable<Sprite> {
        const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.originated ?? sprite.id)}`;
        const data = new FormData();
        data.append('file', sprite.content);
        data.append('spriteJson', JSON.stringify(sprite));

        return this._http.put<Sprite>(endpoint, data).pipe(catchError(() => of(null)));
    }

    public deleteSprite(sprite: Sprite): Observable<boolean> {
        const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.id)}`;

        return this._http.delete<boolean>(endpoint).pipe(catchError(() => of(false)));
    }
}
