import { Exclude, Expose } from 'class-transformer';
import { CitizenGroup } from 'src/schemas/citizen.schema';

@Exclude()
export class CitizenDto {
    @Expose()
        id: string;

    @Expose()
        name: string;

    @Expose()
        city_id: number;

    @Expose()
        groups: Array<CitizenGroup>;

    constructor ( data: Partial<CitizenDto> ) {
        Object.assign( this, data );
    }
}
