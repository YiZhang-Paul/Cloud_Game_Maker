import { MiniToolbarOption } from '../../enum/mini-toolbar-option.enum';

export class ToolbarActionOption {
    public type: MiniToolbarOption;
    public isDisabled = false;

    constructor(type: MiniToolbarOption, isDisabled = false) {
        this.type = type;
        this.isDisabled = isDisabled;
    }
}
