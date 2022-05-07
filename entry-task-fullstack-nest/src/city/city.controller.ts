import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller( 'city' )
@ApiTags( 'City' )
export class CityController {
    constructor ( private city_service: CityService ) {}

    @ApiOperation( { summary: 'Returns all objects stored in City collection' } )
    @Get( '' )
    @ApiOkResponse( { type: CityDto } )
    async get_all (): Promise<Array<CityDto>> {
        return ( await this.city_service.get_all_cities() )
            .map( ( el ) => {
                return new CityDto( el );
            } );
    }
}
