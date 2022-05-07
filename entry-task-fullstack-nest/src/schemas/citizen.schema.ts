import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CitizenDocument = Citizen & Document;

export interface CitizenGroup {
    type: string,
    name: string,
}

@Schema()
export class Citizen {
    @Prop( { required: true } )
        id: number;

    @Prop( { required: true } )
        name: string;

    @Prop( { required: true } )
        city_id: number;

    @Prop( { required: true, default: [] } )
        groups: Array<CitizenGroup>;
}

export const CitizenSchema = SchemaFactory.createForClass( Citizen );
