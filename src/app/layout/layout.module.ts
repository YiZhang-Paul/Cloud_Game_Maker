import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
    declarations: [TopToolbarComponent],
    imports: [CommonModule],
    exports: [TopToolbarComponent]
})
export class LayoutModule { }
