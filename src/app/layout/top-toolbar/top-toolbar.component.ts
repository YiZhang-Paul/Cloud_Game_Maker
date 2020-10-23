import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    styleUrls: ['./top-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopToolbarComponent {
    @Output() public createScene = new EventEmitter();
}
