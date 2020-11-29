import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IconButtonOption } from '../../../../core/data-model/options/icon-button-option';

@Component({
    selector: 'app-scene-tool-toggles',
    templateUrl: './scene-tool-toggles.component.html',
    styleUrls: ['./scene-tool-toggles.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneToolTogglesComponent {
    @Input() public toolOptions: IconButtonOption[] = [];
    @Output() public toolToggle = new EventEmitter<IconButtonOption>();

    public toggle(tool: IconButtonOption): void {
        tool.isActive = !tool.isActive;
        this.toolToggle.emit(tool);
    }
}
