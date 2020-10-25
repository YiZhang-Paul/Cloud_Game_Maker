import { ConfirmActionOption } from './confirm-action-option';

export class ConfirmPopupOption {
    public title = 'Are you sure?';
    public message: string;

    public actions = [
        new ConfirmActionOption('Proceed', true),
        new ConfirmActionOption('Cancel', false),
    ];

    constructor(title = '', message = '', actions = []) {
        this.title = title || this.title;
        this.message = message;
        this.actions = actions.length ? actions : this.actions;
    }
}
