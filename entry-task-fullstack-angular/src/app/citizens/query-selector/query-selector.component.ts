import { Component, OnInit } from '@angular/core';
import { CitizensService } from '../citizens.service';

@Component( {
    selector: 'citizens-query-selector',
    templateUrl: './query-selector.component.html',
    styleUrls: ['./query-selector.component.scss'],
} )
export class QuerySelectorComponent implements OnInit {
    data: Array<{data: string}> = [{ data: 'city' }, { data: 'district' }];

    constructor ( private citizens_service: CitizensService ) {}

    ngOnInit (): void {
    }

    append_element () {
        this.data.push( { data: '' } );
    }

    pop_element () {
        this.data.pop();
    }

    send_request () {
        this.citizens_service.request_grouped_up_citiznes( this.data.map( ( elem ) => elem.data ) );
    }
}
