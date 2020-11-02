import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { ToolSetPanelComponent } from './tool-set-panel/tool-set-panel.component';

@NgModule({
    declarations: [
        TopToolbarComponent,
        ToolSetPanelComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        TopToolbarComponent,
        ToolSetPanelComponent
    ]
})
export class LayoutModule { }
