import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmPopupOption } from '../../../../core/data-model/options/confirm-popup-option';

@Component({
    selector: 'app-confirm-popup',
    templateUrl: './confirm-popup.component.html',
    styleUrls: ['./confirm-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPopupComponent implements OnInit {

    constructor(private _dialogRef: MatDialogRef<ConfirmPopupComponent>,
                @Inject(MAT_DIALOG_DATA) public option: ConfirmPopupOption) { }

    public ngOnInit(): void {
        this._dialogRef.disableClose = true;
    }
}
