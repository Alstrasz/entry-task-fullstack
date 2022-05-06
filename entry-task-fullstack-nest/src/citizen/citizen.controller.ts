import { Controller, Get } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenDto } from './dto/citizen.dto';

@Controller( 'citizen' )
export class CitizenController {
    constructor ( private citizen_service: CitizenService ) {}

    @Get( '' )
    async get_all (): Promise<Array<CitizenDto>> {
        return ( await this.citizen_service.get_all_citizens() )
            .map( ( el ) => {
                return new CitizenDto( el );
            } );
    }
}
