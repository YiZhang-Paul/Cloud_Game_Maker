import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileSystemFileEntry } from 'ngx-file-drop';

@Component({
    selector: 'app-sprite-previewer',
    templateUrl: './sprite-previewer.component.html',
    styleUrls: ['./sprite-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpritePreviewerComponent implements OnInit {
    @Input() public file: FileSystemFileEntry;
    @Input() public confirmAction = 'Confirm';
    @Output() public confirm = new EventEmitter();
    @Output() public cancel = new EventEmitter();
    private _objectUrl = '';
    private _safeUrl: SafeUrl;

    constructor(private _sanitizer: DomSanitizer) { }

    get safeUrl(): SafeUrl {
        return this._safeUrl;
    }

    public ngOnInit(): void {
        this.file.file(_ => {
            this._objectUrl = URL.createObjectURL(_ as Blob);
            this._safeUrl = this._sanitizer.bypassSecurityTrustUrl(this._objectUrl);
        });
    }

    public onImageLoaded(): void {
        URL.revokeObjectURL(this._objectUrl);
    }
}
