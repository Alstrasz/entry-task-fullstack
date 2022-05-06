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

    async get_all_cities (): Promise<Array<CityDocument>> {
        return this.city_model.find( {} ).lean();
    }
}
