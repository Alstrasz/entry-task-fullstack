import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

export class GroupByRequestDto {
    @ApiProperty( {
        type: [String],
        description: 'Query for group by. Will be returned nested object with ith layer corresponing to ith element in query',
    } )
    @IsArray()
    @ArrayMinSize( 1 )
        query: Array<string>;
}
