import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CitizensModule } from './citizens/citizens.module';

@NgModule( {
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CitizensModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
} )
export class AppModule { }
