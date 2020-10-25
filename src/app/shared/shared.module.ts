import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilePickerComponent } from './components/buttons/file-picker/file-picker.component';
import { EditableTextBoxComponent } from './components/inputs/editable-text-box/editable-text-box.component';
import { ConfirmPopupComponent } from './components/popups/confirm-popup/confirm-popup.component';

@NgModule({
    declarations: [
        FilePickerComponent,
        EditableTextBoxComponent,
        ConfirmPopupComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        MatDialogModule,
        NgxFileDropModule,
        DragDropModule,
        ImageCropperModule
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        MatDialogModule,
        NgxFileDropModule,
        DragDropModule,
        ImageCropperModule,
        FilePickerComponent,
        EditableTextBoxComponent
    ]
})
export class SharedModule { }
