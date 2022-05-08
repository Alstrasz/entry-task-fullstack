import { Component, Input, OnInit } from '@angular/core';
import { CitizensService } from '../citizens.service';
import { Citizen } from '../interfaces/citizen.interface';

@Component( {
    selector: 'citizens-citizen-text',
    templateUrl: './citizen-text.component.html',
    styleUrls: ['./citizen-text.component.scss'],
} )
export class CitizenTextComponent implements OnInit {
    @Input() citizen?: Citizen;
    tooltip: string = '';

    constructor ( private citizens_service: CitizensService ) { }

    ngOnInit (): void { }


    get_toltip ( ) {
        let city_name = undefined;
        if ( this.citizen == undefined ) {
            this.tooltip = 'Citizen undefined';
            return;
        }
        this.citizen.groups.forEach( ( elem ) => {
            if ( elem.type == 'city' ) {
                const temp = elem.name.split( ' ' );
                temp.pop();
                city_name = temp.join( ' ' );
            }
        } );
        if ( city_name == undefined ) {
            this.tooltip = 'City group not found';
            return;
        }
        this.citizens_service.get_city_data( city_name )
            .then( ( city ) => {
                if ( city == undefined ) {
                    this.tooltip = 'City not found';
                }
                this.tooltip = `${city?.name} ${city?.data}`;
            } );
    }
}
