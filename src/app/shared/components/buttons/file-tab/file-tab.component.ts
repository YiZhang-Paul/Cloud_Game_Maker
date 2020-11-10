import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-file-tab',
    templateUrl: './file-tab.component.html',
    styleUrls: ['./file-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTabComponent {
    @Input() public name = '';
    @Input() public isActive = false;
    @Output() public tabSelect = new EventEmitter();
}
