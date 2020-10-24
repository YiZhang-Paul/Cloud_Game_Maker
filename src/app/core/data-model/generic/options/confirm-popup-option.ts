export class ConfirmPopupOption {
    public title = 'Are you sure?';
    public message: string;
    public confirmText = 'Proceed';
    public cancelText = 'Cancel';

    constructor(title = '', message = '', confirmText = '', cancelText = '') {
        this.title = title || this.title;
        this.message = message;
        this.confirmText = confirmText || this.confirmText;
        this.cancelText = cancelText || this.cancelText;
    }
}
