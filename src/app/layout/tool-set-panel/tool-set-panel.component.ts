import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-tool-set-panel',
    templateUrl: './tool-set-panel.component.html',
    styleUrls: ['./tool-set-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolSetPanelComponent {
    @Input() public tools: string[] = [];
    public activeTool = '';

    public isActiveTool(index: number): boolean {
        const isDefault = !this.activeTool && index === 0;
        const isSelected = this.tools[index] === this.activeTool;

        return isDefault || isSelected;
    }
}
