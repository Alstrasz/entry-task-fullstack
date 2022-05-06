import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CityDto {
    @Expose()
        id: string;

    @Expose()
        name: string;

    @Expose()
        data: string;

    constructor ( data: Partial<CityDto> ) {
        Object.assign( this, data );
    }
}
