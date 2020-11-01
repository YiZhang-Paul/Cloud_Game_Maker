import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tool-set-panel',
    templateUrl: './tool-set-panel.component.html',
    styleUrls: ['./tool-set-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolSetPanelComponent implements OnInit {
    @Input() public tools: string[] = [];
    public activeTool = '';

    public ngOnInit(): void {
        this.activeTool = this.tools[0] ?? this.activeTool;
    }
}
