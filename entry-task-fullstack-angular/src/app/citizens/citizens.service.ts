import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import * as cache from 'memory-cache';
import { City } from './interfaces/city.interface';
import * as _ from 'lodash';
import { server_base_url } from '../constants/url';

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
                baseURL: server_base_url,
                method: 'get',
                url: '/citizen',
            } ) ).data;
        } else {
            this.grouped_up_citizens = ( await axios( {
                baseURL: server_base_url,
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

    async get_city_data ( city_name: string ): Promise<City | undefined> {
        let ret = cache.get( city_name );
        if ( ret === null ) {
            ret = await axios( {
                baseURL: server_base_url,
                method: 'get',
                url: `/city/${city_name}`,
            } )
                .then( ( res ) => {
                    return res.data[0] as City; // array returned here but most likely we want just any eleent from it.. right?
                } )
                .catch( ( _err ) => {
                    console.log( `Unable to get city ${city_name}` );
                    return undefined;
                } );
            cache.put( city_name, ret, 10000, ( key, val ) => {
                console.log( 'Timedout', key, val );
            } );
            console.log( `Updated city value for ${city_name} with `, ret );
        }
        return ret;
    }
}
