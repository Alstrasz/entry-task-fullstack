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

    async get_all_citizens (): Promise<Array<CitizenDocument>> {
        return this.citizen_model.find( {} ).lean();
    }

    async group_by ( order: Array<string> ): Promise<NestedCitizen> {
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
            // {
            //     $group: {
            //         _id: null,
            //         elems: {
            //             $accumulator: {
            //                 init: ( _order: Array<string> ): NestedDecomposedCitizen => {
            //                     return {};
            //                 },
            //                 initArgs: [order], // Optional
            //                 accumulate: (
            //                     state: NestedDecomposedCitizen,
            //                     root: DecomposedCitizen,
            //                     order: Array<string>,
            //                 ): NestedDecomposedCitizen => {
            //                     const path = order.map( ( key ) => root.groups[key] );
            //                     path.push( _.get( state, path, [] ).length );
            //                     _.set( state, path, root );
            //                     return state;
            //                 },
            //                 accumulateArgs: ['$$ROOT', order],
            //                 merge: ( state_1: NestedDecomposedCitizen, state_2: NestedDecomposedCitizen ): NestedDecomposedCitizen => {
            //                     return _.mergeWith( state_1, state_2, ( objValue, srcValue ) => {
            //                         if ( _.isArray( objValue ) ) {
            //                             return objValue.concat( srcValue );
            //                         }
            //                     } );
            //                 },
            //                 lang: 'js',
            //             },
            //         },

            //     },
            //  },
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
