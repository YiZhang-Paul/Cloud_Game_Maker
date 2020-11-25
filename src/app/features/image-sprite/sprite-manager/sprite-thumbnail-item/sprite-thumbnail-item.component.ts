import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Point } from '../../../../../engine/core/data-model/generic/point';
import { SpriteFile } from '../../../../../engine/core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-thumbnail-item',
    templateUrl: './sprite-thumbnail-item.component.html',
    styleUrls: ['./sprite-thumbnail-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteThumbnailItemComponent {
    @Input() public file: SpriteFile;
    @Input() public isDragMode = false;
    @Output() public editStart = new EventEmitter<Point>();
    @Output() public delete = new EventEmitter();
    @Output() public nameChange = new EventEmitter<string>();
    @Output() public dragBegin = new EventEmitter();
    @Output() public dragCancel = new EventEmitter();
    private _holdTimer: number;

    public onHoldStart(event: MouseEvent): void {
        this._holdTimer = window.setTimeout(() => {
            if (this._holdTimer) {
                this.dragBegin.emit(new Point(event.clientX, event.clientY));
                this._holdTimer = null;
            }
        }, 50);
    }

    public onHoldCancel(): void {
        this.dragCancel.emit();

        if (this._holdTimer) {
            window.clearTimeout(this._holdTimer);
            this._holdTimer = null;
        }
    }

    public ignoreDrag(event: MouseEvent): void {
        event.stopPropagation();
    }
}
