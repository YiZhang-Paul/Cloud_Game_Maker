import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileSystemFileEntry } from 'ngx-file-drop';

@Component({
    selector: 'app-image-display-panel',
    templateUrl: './image-display-panel.component.html',
    styleUrls: ['./image-display-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDisplayPanelComponent implements OnInit {
    @Input() public file: FileSystemFileEntry;
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

    public onLoad(): void {
        URL.revokeObjectURL(this._objectUrl);
    }
}
