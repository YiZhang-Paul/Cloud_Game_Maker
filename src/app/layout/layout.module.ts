import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
    declarations: [TopToolbarComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [TopToolbarComponent]
})
export class LayoutModule { }
