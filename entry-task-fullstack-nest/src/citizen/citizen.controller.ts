import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenDto } from './dto/citizen.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { NestedCitizenDto } from './dto/nested_citizen.dto';
import { GroupByRequestDto } from './dto/group_by_request.dto';

@Controller( 'citizen' )
@ApiTags( 'Citizen' )
export class CitizenController {
    constructor ( private citizen_service: CitizenService ) {}

    @Get( '' )
    @ApiOperation( { summary: 'Returns all objects stored in Citizen collection' } )
    @ApiOkResponse( { type: CitizenDto } )
    async get_all (): Promise<Array<CitizenDto>> {
        return ( await this.citizen_service.get_all_citizens() )
            .map( ( el ) => {
                return new CitizenDto( el );
            } );
    }

    @Post( 'grouped' )
    @HttpCode( HttpStatus.OK )
    @ApiOperation( {
        summary: 'Returns all objects stored in Citizen collection group by by query',
        description: 'Returns nested object, keys on ith leayer correspond to ith element from query. Layer keys taken from CitizenDto.groups[:].name. Query should be from CitizenDto.groups[:].type',
    } )
    @ApiOkResponse( { type: NestedCitizenDto } )
    async get_grouped ( @Body() group_by_request_dto: GroupByRequestDto ): Promise<NestedCitizenDto> {
        const values = await this.citizen_service.group_by( group_by_request_dto.query );
        console.log( values );
        return new NestedCitizenDto( values );
    }
}
