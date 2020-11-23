export class IconButtonOption {
    public icon = '';
    public name = '';
    public isActive = false;

    constructor(icon = '', name = '', isActive = false) {
        this.icon = icon;
        this.name = name;
        this.isActive = isActive;
    }
}
