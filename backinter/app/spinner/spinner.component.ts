'use strict';

import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    selector: 'my-spinner',
    templateUrl: 'spinner/spinner.component.html',
    styleUrls:['spinner/spinner.css']
})
export class SpinnerComponent implements OnDestroy {  
    private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 100;//if the loading take more than second spinner will be shown 

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = window.setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}