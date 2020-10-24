import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilePickerComponent } from './components/buttons/file-picker/file-picker.component';

@NgModule({
    declarations: [
        FilePickerComponent
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
        FilePickerComponent
    ]
})
export class SharedModule { }
