import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function apply_middleware ( app: INestApplication ) {
    app.useGlobalInterceptors( new ClassSerializerInterceptor( app.get( Reflector ) ) );
}


export function setup_swagger ( app: INestApplication ) {
    const config = new DocumentBuilder()
        .setTitle( 'entry-task-fullstack-nest' )
        .setDescription( 'Api descciption of entry-task-fullstack-nest, project build to pass entry test. App provides access to database through some queryes, in particluar, custom group by' )
        .setVersion( '0.1' )
        .addTag( 'App' )
        .build();
    const document = SwaggerModule.createDocument( app, config );
    SwaggerModule.setup( 'api', app, document );
}

async function bootstrap () {
    const app = await NestFactory.create( AppModule );
    apply_middleware( app );
    setup_swagger( app );
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';
    await app.listen( port, host, () => {
        console.log( 'APP tarting at ', port, host );
    } );
}
bootstrap();
