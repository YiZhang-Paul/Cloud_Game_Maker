import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        NgxFileDropModule
    ],
    exports: [
        FlexLayoutModule,
        NgxFileDropModule
    ]
})
export class SharedModule { }
