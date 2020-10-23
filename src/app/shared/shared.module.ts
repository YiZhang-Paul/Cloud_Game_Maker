import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilePickerComponent } from './components/buttons/file-picker/file-picker.component';
import { ImageDisplayPanelComponent } from './components/panels/image-display-panel/image-display-panel.component';

@NgModule({
    declarations: [
        FilePickerComponent,
        ImageDisplayPanelComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        NgxFileDropModule,
        DragDropModule,
        ImageCropperModule
    ],
    exports: [
        FlexLayoutModule,
        NgxFileDropModule,
        DragDropModule,
        ImageCropperModule,
        FilePickerComponent,
        ImageDisplayPanelComponent
    ]
})
export class SharedModule { }
