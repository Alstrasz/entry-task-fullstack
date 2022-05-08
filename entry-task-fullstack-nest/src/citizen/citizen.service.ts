import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Citizen, CitizenDocument } from 'src/schemas/citizen.schema';
import * as _ from 'lodash';

import * as citizens from '../constants/citizens.json';
import { NestedCitizen } from './dto/nested_citizen.dto';

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


    /**
     * Returns all documents from citizen collection
     *
     * @return {*}  {Promise<Array<CitizenDocument>>}
     * @memberof CitizenService
     */
    async get_all_citizens (): Promise<Array<CitizenDocument>> {
        return this.citizen_model.find( {} ).lean();
    }


    /**
     * Returns all documents from citizen collection grouped by order
     * Throws error if order is empty
     *
     * @param {Array<string>} order
     * @return {*}  {Promise<NestedCitizen>}
     * @memberof CitizenService
     */
    async group_by ( order: Array<string> ): Promise<NestedCitizen> {
        if ( order == [] ) {
            throw new Error( 'Order should not be empry' );
        }
        return this.citizen_model.aggregate( [
            {
                $project: {
                    _id: false,
                    id: true,
                    name: true,
                    city_id: true,
                    groups: true,
                    _groups: {
                        $arrayToObject: {
                            $zip: {
                                inputs: ['$groups.type', '$groups.name'],
                            },
                        },
                    },
                },
            },
        ] ).then( ( el ) => {
            const acc = {};
            el.forEach( ( root ) => {
                const path = order.map( ( key ) => root._groups[key] );
                path.push( _.get( acc, path, [] ).length );
                _.unset( root, '_groups' );
                _.set( acc, path, root );
            } );
            return acc;
        } );
    }
}
