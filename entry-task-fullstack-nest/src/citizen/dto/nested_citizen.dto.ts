import * as _ from 'lodash';
import { Citizen } from 'src/schemas/citizen.schema';
import { CitizenDto } from './citizen.dto';
import { ApiProperty } from '@nestjs/swagger';


export interface NestedCitizen {
    [type: string]: NestedCitizen | Array<Citizen>
};

export class NestedCitizenInner {
    @ApiProperty( {
        type: [CitizenDto],
        description: 'Nested and recursive property, meaning, it can have more then one layer and be more then once on each layer. ' +
            '"property" is a placeholder, values for it taken from CitizenDto.groups[:].name',
    } )
        property: NestedCitizenInner | Array<CitizenDto>;

    [type: string]: NestedCitizenInner | Array<CitizenDto>;
}

export class NestedCitizenDto {
    @ApiProperty()
        root: NestedCitizenInner;

    constructor ( nested_citizen: NestedCitizen ) {
        const ret = _.cloneDeep( nested_citizen );
        _.mapValues( ret, ( elem ) => {
            if ( _.isArray( elem ) ) {
                elem.map( ( value ) => {
                    return new CitizenDto( value );
                } );
            }
        } );
        this.root = ret as NestedCitizenInner;
    }
}
