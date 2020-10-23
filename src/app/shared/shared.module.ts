import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        NgxFileDropModule,
        DragDropModule
    ],
    exports: [
        FlexLayoutModule,
        NgxFileDropModule,
        DragDropModule
    ]
})
export class SharedModule { }
