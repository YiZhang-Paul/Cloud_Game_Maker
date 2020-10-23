import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
    declarations: [TopToolbarComponent],
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    exports: [TopToolbarComponent]
})
export class LayoutModule { }
