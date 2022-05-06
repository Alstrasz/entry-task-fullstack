import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Citizen, CitizenSchema } from 'src/schemas/citizen.schema';
import { CitizenController } from './citizen.controller';
import { CitizenService } from './citizen.service';

@Module( {
    imports: [MongooseModule.forFeature( [
        { name: Citizen.name, schema: CitizenSchema },
    ] )],
    controllers: [CitizenController],
    providers: [CitizenService],
} )
export class CitizenModule {}
