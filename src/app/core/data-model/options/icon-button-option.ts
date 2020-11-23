export class IconButtonOption {
    public icon = '';
    public tooltip = '';
    public isActive = false;

    constructor(icon = '', tooltip = '', isActive = false) {
        this.icon = icon;
        this.tooltip = tooltip;
        this.isActive = isActive;
    }
}
