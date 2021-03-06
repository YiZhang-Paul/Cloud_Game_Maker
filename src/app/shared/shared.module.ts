import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilePickerComponent } from './components/buttons/file-picker/file-picker.component';
import { FileTabComponent } from './components/buttons/file-tab/file-tab.component';
import { EditableTextBoxComponent } from './components/inputs/editable-text-box/editable-text-box.component';
import { EditableTextBoxEmbeddedComponent } from './components/inputs/editable-text-box-embedded/editable-text-box-embedded.component';
import { ConfirmPopupComponent } from './components/popups/confirm-popup/confirm-popup.component';
import { ImageBlobDisplayComponent } from './components/inputs/image-blob-display/image-blob-display.component';
import { MiniToolbarComponent } from './components/toolbars/mini-toolbar/mini-toolbar.component';

@NgModule({
    declarations: [
        FilePickerComponent,
        FileTabComponent,
        EditableTextBoxComponent,
        EditableTextBoxEmbeddedComponent,
        ConfirmPopupComponent,
        ImageBlobDisplayComponent,
        MiniToolbarComponent
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3500,
                verticalPosition: 'top'
            }
        },
        {
            provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
            useValue: { position: 'above' }
        }
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        NgxFileDropModule,
        DragDropModule,
        ImageCropperModule
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        NgxFileDropModule,
        DragDropModule,
        ImageCropperModule,
        FilePickerComponent,
        FileTabComponent,
        EditableTextBoxComponent,
        EditableTextBoxEmbeddedComponent,
        ImageBlobDisplayComponent,
        MiniToolbarComponent
    ]
})
export class SharedModule { }
