import { Controller, Get, Param } from '@nestjs/common';
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

    @ApiOperation( {
        summary: 'Returns array of cities with a corresponding name from City collection',
        description: 'Mostly returns array of one element, but technically it is possible to have multiple cities with the same name',
    } )
    @Get( ':name' )
    @ApiOkResponse( { type: CityDto } )
    async get_by_name ( @Param( 'name' ) name: string ): Promise<Array<CityDto>> {
        return ( await this.city_service.get_city_by_name( name ) )
            .map( ( el ) => {
                return new CityDto( el );
            } ); ;
    }
}
