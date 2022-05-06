import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';

@Controller( 'city' )
export class CityController {
    constructor ( private city_service: CityService ) {}

    @Get( '' )
    async get_all (): Promise<Array<CityDto>> {
        return ( await this.city_service.get_all_cities() )
            .map( ( el ) => {
                return new CityDto( el );
            } );
    }
}
