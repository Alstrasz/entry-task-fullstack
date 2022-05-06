import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

export function apply_middleware ( app: INestApplication ) {
    app.useGlobalInterceptors( new ClassSerializerInterceptor( app.get( Reflector ) ) );
}

async function bootstrap () {
    const app = await NestFactory.create( AppModule );
    apply_middleware( app );
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';
    await app.listen( port, host, () => {
        console.log( 'APP tarting at ', port, host );
    } );
}
bootstrap();
