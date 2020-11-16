import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { store } from './store';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { FeaturesModule } from './features/features.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        StoreModule.forRoot(store.reducers),
        EffectsModule.forRoot([]),
        AppRoutingModule,
        CoreModule,
        LayoutModule,
        FeaturesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
