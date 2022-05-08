import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupedUpViewComponent } from './grouped-up-view/grouped-up-view.component';
import { QuerySelectorComponent } from './query-selector/query-selector.component';
import { WindowComponent } from './window/window.component';
import { FormsModule } from '@angular/forms';
import { GroupedUpViewInnerComponent } from './grouped-up-view-inner/grouped-up-view-inner.component';


@NgModule( {
    declarations: [
        GroupedUpViewComponent,
        QuerySelectorComponent,
        WindowComponent,
        GroupedUpViewInnerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        WindowComponent,
    ],
} )
export class CitizensModule { }
