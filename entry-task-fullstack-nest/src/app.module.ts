import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { CitizenModule } from './citizen/citizen.module';

@Module( {
    imports: [
        MongooseModule.forRootAsync( {
            useFactory: async ( ) => ( {
                uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:8087',
            } ),
        } ),
        CityModule,
        CitizenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
} )
export class AppModule {}
