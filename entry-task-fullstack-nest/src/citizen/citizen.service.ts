import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Citizen, CitizenDocument } from 'src/schemas/citizen.schema';

import * as citizens from '../constants/citizens.json';

@Injectable()
export class CitizenService {
    constructor (
        @InjectModel( Citizen.name ) private citizen_model: Model<CitizenDocument>,
    ) {
        citizen_model.count( {} ).then( ( count: number ) => {
            if ( count < citizens.length ) {
                citizen_model.insertMany( citizens );
            }
        } );
    }

    async get_all_citizens (): Promise<Array<CitizenDocument>> {
        return this.citizen_model.find( {} ).lean();
    }
}
