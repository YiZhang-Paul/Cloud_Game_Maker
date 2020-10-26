import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-image-blob-display',
    templateUrl: './image-blob-display.component.html',
    styleUrls: ['./image-blob-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBlobDisplayComponent implements OnInit {
    @Input() public blob: Blob;
    private _objectUrl = '';
    private _safeUrl: SafeUrl;

    constructor(private _sanitizer: DomSanitizer) { }

    get safeUrl(): SafeUrl {
        return this._safeUrl;
    }

    public ngOnInit(): void {
        this._objectUrl = URL.createObjectURL(this.blob);
        this._safeUrl = this._sanitizer.bypassSecurityTrustUrl(this._objectUrl);
    }

    public onLoad(): void {
        URL.revokeObjectURL(this._objectUrl);
    }
}
