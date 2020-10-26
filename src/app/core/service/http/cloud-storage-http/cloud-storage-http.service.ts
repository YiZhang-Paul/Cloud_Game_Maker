import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';
import { SpriteFile } from '../../../data-model/sprite/sprite-file';

@Injectable({
    providedIn: 'root'
})
export class CloudStorageHttpService {
    private readonly _api = `${environment.apiUrl}/api/cloud-storage`;

    constructor(private _http: HttpClient) { }

    public async getSprites(): Promise<SpriteFile[]> {
        try {
            const endpoint = `${this._api}/sprites`;
            const sprites = await this._http.get<SpriteFile[]>(endpoint).toPromise();

            return sprites.map(_ => SpriteFile.fromSpriteFile(_, true));
        }
        catch {
            return [];
        }
    }

    public async addSprite(sprite: SpriteFile): Promise<boolean> {
        try {
            const endpoint = `${this._api}/sprites`;

            return await this._http.post<boolean>(endpoint, sprite).toPromise();
        }
        catch {
            return false;
        }
    }

    public async deleteSprite(sprite: SpriteFile): Promise<boolean> {
        try {
            const endpoint = `${this._api}/sprites/${encodeURIComponent(sprite.id)}`;

            return await this._http.delete<boolean>(endpoint).toPromise();
        }
        catch {
            return false;
        }
    }
}
