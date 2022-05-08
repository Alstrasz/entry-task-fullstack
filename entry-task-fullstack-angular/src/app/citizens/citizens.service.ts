import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';

@Injectable( {
    providedIn: 'root',
} )
export class CitizensService {
    grouped_up_citizens: any = {};
    grouped_up_citizens_subject: Subject<any> = new Subject<any>();

    constructor () {}

    async request_grouped_up_citiznes ( query: Array<string> ) {
        if ( query.length == 0 ) {
            this.grouped_up_citizens = ( await axios( {
                baseURL: 'http://127.0.0.1:3000',
                method: 'get',
                url: '/citizen',
            } ) ).data;
        } else {
            this.grouped_up_citizens = ( await axios( {
                baseURL: 'http://127.0.0.1:3000',
                method: 'post',
                url: '/citizen/grouped',
                data: {
                    query,
                },
            } ) ).data.root;
        }

        this.grouped_up_citizens_subject.next( this.grouped_up_citizens );

        console.log( this.grouped_up_citizens );
    }
}
