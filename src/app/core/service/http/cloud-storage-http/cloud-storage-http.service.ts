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

    public async addSprite(sprite: SpriteFile): Promise<boolean> {
        try {
            const endpoint = `${this._api}/sprites`;

            return await this._http.post<boolean>(endpoint, sprite).toPromise();
        }
        catch {
            return false;
        }
    }
}
