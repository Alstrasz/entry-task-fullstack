import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataHandlerModule } from './data_handler/data_handler.module';

@Module( {
    imports: [
        MongooseModule.forRootAsync( {
            useFactory: async ( ) => ( {
                uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:8087',
            } ),
        } ),
        DataHandlerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
} )
export class AppModule {}
