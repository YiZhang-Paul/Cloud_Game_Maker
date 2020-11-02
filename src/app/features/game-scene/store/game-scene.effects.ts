import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

import * as actions from './game-scene.actions';

@Injectable()
export class ScenesEffects {

    public loadScenesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.loadScenesRemote),
        mergeMap(() => this._cloudStorageHttp.getScenes()),
        map(_ => actions.addScenes({ payload: _ }))
    ));

    constructor(private _actions$: Actions, private _cloudStorageHttp: CloudStorageHttpService) { }
}
