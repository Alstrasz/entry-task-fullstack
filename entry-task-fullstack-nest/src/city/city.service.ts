import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from 'src/schemas/city.schema';

import * as cities from '../constants/cities.json';

@Injectable()
export class CityService {
    constructor (
        @InjectModel( City.name ) private city_model: Model<CityDocument>,
    ) {
        city_model.count( {} ).then( ( count: number ) => {
            if ( count < cities.length ) {
                city_model.insertMany( cities );
            }
        } );
    }


    /**
     * Returns all documents from city collection
     *
     * @return {*}  {Promise<Array<CityDocument>>}
     * @memberof CityService
     */
    async get_all_cities (): Promise<Array<CityDocument>> {
        return this.city_model.find( {} ).lean();
    }


    /**
     * Returns all documents from city collection this corresponding name
     *
     * @param {string} name
     * @return {*}  {Promise<Array<CityDocument>>}
     * @memberof CityService
     */
    async get_city_by_name ( name: string ): Promise<Array<CityDocument>> {
        return this.city_model.find( { name } ).lean();
    }
}
