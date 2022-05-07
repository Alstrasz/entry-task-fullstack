import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CityDto {
    @ApiProperty()
    @Expose()
        id: string;

    @ApiProperty()
    @Expose()
        name: string;

    @ApiProperty()
    @Expose()
        data: string;

    constructor ( data: Partial<CityDto> ) {
        Object.assign( this, data );
    }
}
