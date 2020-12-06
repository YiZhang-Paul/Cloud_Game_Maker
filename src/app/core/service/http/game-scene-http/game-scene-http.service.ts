import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Scene } from '../../../../../engine/core/data-model/scene/scene';
import { SceneDescriptor } from '../../../data-model/descriptors/scene-descriptor';

@Injectable({
    providedIn: 'root'
})
export class GameSceneHttpService {
    private readonly _api = `${environment.apiUrl}/api/v1/scenes`;

    constructor(private _http: HttpClient) { }

    public getDescriptors(): Observable<SceneDescriptor[]> {
        return this._http.get<SceneDescriptor[]>(this._api).pipe(catchError(() => of([])));
    }

    public getScene(descriptor: SceneDescriptor): Observable<Scene> {
        const endpoint = `${this._api}/${descriptor.id}`;

        return this._http.get<Scene>(endpoint).pipe(catchError(() => of(null)));
    }

    public addScene(scene: Scene): Observable<SceneDescriptor> {
        return this._http.post<SceneDescriptor>(this._api, scene).pipe(catchError(() => of(null)));
    }

    public updateScene(scene: Scene): Observable<boolean> {
        return this._http.put<boolean>(this._api, scene).pipe(catchError(() => of(null)));
    }

    public deleteScene(descriptor: SceneDescriptor): Observable<boolean> {
        const endpoint = `${this._api}/${descriptor.id}`;

        return this._http.delete<boolean>(endpoint).pipe(catchError(() => of(false)));
    }
}
