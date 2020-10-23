import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxFileDropModule } from 'ngx-file-drop';

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
        DragDropModule
    ],
    exports: [
        FlexLayoutModule,
        NgxFileDropModule,
        DragDropModule,
        FilePickerComponent,
        ImageDisplayPanelComponent
    ]
})
export class SharedModule { }
