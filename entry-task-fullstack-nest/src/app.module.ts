import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { CitizenModule } from './citizen/citizen.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from './logger.middleware';

@Module( {
    imports: [
        MongooseModule.forRootAsync( {
            useFactory: async ( ) => ( {
                uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:8087',
            } ),
        } ),
        ServeStaticModule.forRoot( {
            rootPath: join( __dirname, '..', 'mkp' ),
        } ),
        CityModule,
        CitizenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
} )
export class AppModule implements NestModule {
    configure ( consumer: MiddlewareConsumer ) {
        consumer.apply( LoggerMiddleware ).forRoutes( '*' );
    }
}
