import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component( {
    selector: 'citizens-grouped-up-view-inner',
    templateUrl: './grouped-up-view-inner.component.html',
    styleUrls: ['./grouped-up-view-inner.component.scss'],
} )
export class GroupedUpViewInnerComponent implements OnInit {
    @Input() data: any = [];

    constructor () { }

    ngOnInit (): void {
    }

    is_array ( arg: any ): boolean {
        return _.isArray( arg );
    }
}
