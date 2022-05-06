import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

export interface CityGroup {
    type: string,
    name: string,
}

@Schema()
export class City {
    @Prop( { required: true, unique: true } )
        id: string;

    @Prop( { required: true } )
        name: string;

    @Prop( { required: true } )
        data: string;
}

export const CitySchema = SchemaFactory.createForClass( City );
