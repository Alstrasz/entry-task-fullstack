import { ApiProperty } from '@nestjs/swagger';

export class GroupByRequestDto {
    @ApiProperty( {
        type: [String],
        description: 'Query for group by. Will be returned nested object with ith layer corresponing to ith element in query',
    } )
        query: Array<string>;
}
