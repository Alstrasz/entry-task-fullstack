import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitizensService } from '../citizens.service';

@Component( {
    selector: 'citizens-grouped-up-view',
    templateUrl: './grouped-up-view.component.html',
    styleUrls: ['./grouped-up-view.component.scss'],
} )
export class GroupedUpViewComponent implements OnInit, OnDestroy {
    data: any = undefined;
    data_subscription!: Subscription;

    constructor ( private citizens_service: CitizensService ) {}

    ngOnInit (): void {
        this.data_subscription = this.citizens_service.grouped_up_citizens_subject.subscribe( ( val ) => {
            this.data = val;
        } );
    }

    ngOnDestroy (): void {
        this.data_subscription.unsubscribe();
    }
}
