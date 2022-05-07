import { Exclude, Expose } from 'class-transformer';
import { CitizenGroup as CitizenGroupInterface } from 'src/schemas/citizen.schema';
import { ApiProperty } from '@nestjs/swagger';

// Used to pass to swagger, has no logic and used nowhere else
class CitizenGroup implements CitizenGroupInterface {
    @ApiProperty()
        type: string;
    @ApiProperty()
        name: string;
};

@Exclude()
export class CitizenDto {
    @ApiProperty()
    @Expose()
        id: number;

    @ApiProperty()
    @Expose()
        name: string;

    @ApiProperty()
    @Expose()
        city_id: number;

    @ApiProperty( { type: () => [CitizenGroup] } )
    @Expose()
        groups: Array<CitizenGroup>;

    constructor ( data: Partial<CitizenDto> ) {
        Object.assign( this, data );
    }
}
