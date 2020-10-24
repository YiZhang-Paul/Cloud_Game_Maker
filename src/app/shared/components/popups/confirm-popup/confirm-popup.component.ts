import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmPopupOption } from '../../../../core/data-model/generic/options/confirm-popup-option';

@Component({
    selector: 'app-confirm-popup',
    templateUrl: './confirm-popup.component.html',
    styleUrls: ['./confirm-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPopupComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public option: ConfirmPopupOption) { }
}
